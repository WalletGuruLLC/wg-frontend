'use client';

import type { ReactNode } from 'react';
import type { z } from 'zod';
import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
	createColumnHelper,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { CircleCheck, PlusCircle, Search, TriangleAlert } from 'lucide-react';

import { useBooleanHandlers } from '@wg-frontend/hooks/use-boolean-handlers';
import { cn } from '@wg-frontend/ui';
import { DialogFooter } from '@wg-frontend/ui/dialog';
import { Form, FormControl, FormField, useForm } from '@wg-frontend/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectValue,
} from '@wg-frontend/ui/select';
import { toast } from '@wg-frontend/ui/toast';

import { HealthCheck, useGetHealthCheckQuery, Wallet } from '~/lib/data-access';
import type { paginationAndSearchValidator } from '~/lib/validators';
import { Button } from '~/components/button';
import { FormMessage } from '~/components/form';
import { SelectTrigger } from '~/components/select';
import {
	useAddOrEditWalletMutation,
	useGetAuthedUserAccessLevelsQuery,
} from '~/lib/data-access';
import { useErrors } from '~/lib/data-access/errors';
import { useAccessLevelGuard } from '~/lib/hooks';
import { useI18n } from '~/lib/i18n';
import { addOrEditWalletValidator } from '~/lib/validators';
import ConfirmDialog from '../_components/dashboard-confirm-dialog';
import Dialog from '../_components/dashboard-dialog';
import { FormItem, FormLabel } from '../_components/dashboard-form';
import { Input } from '../_components/dashboard-input';
import { Switch } from '../_components/dashboard-switch';
import Table, {
	ColumnHeader,
	PaginationFooter,
} from '../_components/dashboard-table';
import { SimpleTitle } from '../_components/dashboard-title';


const columnHelper = createColumnHelper<HealthCheck>();

const columns = [
	columnHelper.accessor('name', {
		id: 'name',
		cell: (info) => info.getValue(),
		header: () => (
			<ColumnHeader i18nKey="dashboard.health.service" />
		),
	}),
	columnHelper.accessor('status', {
		id: 'status',
		cell: (info) => (
			info.getValue() === 'HEALTHY' ? (
				<div className="pr-4 bg-green-500 p-2 flex items-center justify-center h-10 text-white rounded-lg max-w-40 text-sm ">
					<CircleCheck className="text-black-500 pr-1" /> {info.getValue()}
				</div>
			) : (
				<div className="pr-4 bg-red-500 p-2 flex items-center justify-center h-10 text-white rounded-lg max-w-40 text-sm">
					<TriangleAlert className="text-text-black-500 pr-1" /> {info.getValue()}
				</div>
			)
		),
		header: () => (
			<ColumnHeader i18nKey="dashboard.health.status" />
		),
	}),
];

export default function WalletManagementPage() {
	const loading = useAccessLevelGuard({
		general: {
			module: 'healthCheck',
		},
	});
	const { values } = useI18n();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const paginationAndSearch: z.infer<typeof paginationAndSearchValidator> = {
		page: searchParams.get('page') ?? '1',
		items: searchParams.get('items') ?? '10',
		search: searchParams.get('search') ?? '',
	};

	const { data, isLoading } = useGetHealthCheckQuery(paginationAndSearch);
	const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
		useGetAuthedUserAccessLevelsQuery(undefined);

	const table = useReactTable({
		data: data?.healthCheck ?? [],
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
	});

	function handlePaginationAndSearchChange(
		newPaginationAndSearch: Partial<
			z.infer<typeof paginationAndSearchValidator>
		>,
	) {
		const params = new URLSearchParams(searchParams);
		for (const key in newPaginationAndSearch) {
			const val =
				newPaginationAndSearch[key as keyof typeof newPaginationAndSearch];
			if (val) {
				params.set(key, val);
			} else {
				params.delete(key);
			}
		}
		router.replace(`${pathname}?${params.toString()}`, {
			scroll: false,
		});
	}

	const firstRowIdx =
		Number(paginationAndSearch.items) * Number(paginationAndSearch.page) -
		Number(paginationAndSearch.items) +
		1;
	const lastRowIdx = firstRowIdx + table.getRowModel().rows.length - 1;

	if (loading || isLoadingAccessLevels) return null;

	return (
		<div className="flex h-[83vh] flex-col space-y-10 pb-4">
			<SimpleTitle
				title={values['dashboard.health.title']}
				showLoadingIndicator={isLoading}
			/>
			<div className="flex flex-row items-center space-x-6">
				<div className="relative flex-1">
					<Input
						placeholder={
							values['dashboard.wallet-management.search.placeholder']
						}
						className="rounded-full border border-black"
						name="search"
						onChange={(e) =>
							handlePaginationAndSearchChange({
								...paginationAndSearch,
								search: e.target.value,
								page: '1',
							})
						}
						defaultValue={paginationAndSearch.search}
					/>
					<Search
						className="absolute right-4 top-1/2 size-6 -translate-y-1/2 transform"
						strokeWidth={0.75}
					/>
				</div>

			</div>
			<div className="flex-1 overflow-auto">
				<Table table={table} />
			</div>
			<div>
				<PaginationFooter
					count={{
						total: data?.total ?? 0,
						firstRowIdx,
						lastRowIdx,
					}}
					items={paginationAndSearch.items ?? '10'}
					onItemsChange={(items) =>
						handlePaginationAndSearchChange({
							...paginationAndSearch,
							items,
							page: '1',
						})
					}
					canPreviousPage={paginationAndSearch.page !== '1'}
					canNextPage={
						data?.healthCheck.length === Number(paginationAndSearch.items)
					}
					onPreviousPage={() =>
						handlePaginationAndSearchChange({
							...paginationAndSearch,
							page: String(Number(paginationAndSearch.page) - 1),
						})
					}
					onNextPage={() =>
						handlePaginationAndSearchChange({
							...paginationAndSearch,
							page: String(Number(paginationAndSearch.page) + 1),
						})
					}
				/>
			</div>
		</div>
	);
}

function AddOrEditDialog(props: {
	wallet?: {
		id: string;
		name: string;
		walletType: string;
		walletAddress: string;
	};
	trigger: ReactNode;
}) {
	const { values } = useI18n();
	const errors = useErrors();
	const [isOpen, _, close, toggle] = useBooleanHandlers();

	const form = useForm({
		schema: addOrEditWalletValidator,
		defaultValues: {
			name: props.wallet?.name ?? '',
			walletType: props.wallet?.walletType ?? '',
			walletAddress: props.wallet?.walletAddress ?? '',
			walletId: props.wallet?.id,
		},
	});

	const { mutate, isPending } = useAddOrEditWalletMutation({
		onError: (error) => {
			toast.error(errors[error.message], {
				description: 'Error code: ' + error.message,
			});
		},
		onSuccess: () => {
			toast.success(values[`${valuesPrefix}.toast.success` as const]);
			close();
			form.reset();
		},
	});

	const valuesPrefix =
		`dashboard.wallet-management.${props.wallet ? 'edit' : 'add'}-dialog` as const;

	// This useEffect is used to reset the form when the role prop changes because the form is not unmounted when dialog closes
	useEffect(() => {
		if (props.wallet) {
			form.reset({
				name: props.wallet.name,
				walletType: props.wallet.walletType,
				walletAddress: props.wallet.walletAddress,
				walletId: props.wallet.id,
			});
		}
	}, [props.wallet, form]);

	return (
		<Dialog
			key={props.wallet?.id ?? 'add'}
			isOpen={isOpen}
			toggleOpen={() => {
				form.reset();
				toggle();
			}}
			trigger={props.trigger}
			ariaDescribedBy="add-or-edit-dialog"
		>
			<div className="space-y-9">
				<h1 className="text-3xl font-light">
					{values[`${valuesPrefix}.title`]}
				</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit((data) => mutate(data))}
						className="space-y-9"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{values[`${valuesPrefix}.name.label`]}</FormLabel>
									<FormControl>
										<Input
											placeholder={values[`${valuesPrefix}.name.placeholder`]}
											required
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="walletType"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{values[`${valuesPrefix}.type.label`]}</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger
												className={cn(
													'rounded-none border-transparent border-b-black',
													!field.value && 'text-[#A1A1A1]',
												)}
											>
												<SelectValue
													placeholder={
														values[`${valuesPrefix}.type.placeholder`]
													}
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="White Label">White Label</SelectItem>
											<SelectItem value="Third Party">Third Party</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="walletAddress"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{values[`${valuesPrefix}.address.label`]}
									</FormLabel>
									<FormControl>
										<Input
											placeholder={
												values[`${valuesPrefix}.address.placeholder`]
											}
											required
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter className="pt-9">
							<Button className="w-full" type="submit" disabled={isPending}>
								{
									values[
										isPending
											? 'loading'
											: (`${valuesPrefix}.primary-button` as const)
										]
								}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</div>
		</Dialog>
	);
}
