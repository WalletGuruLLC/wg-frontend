import { Card, CardTitle } from '@wg-frontend/ui/card';
import { Separator } from '@wg-frontend/ui/separator';
import ServiceProviderAdd from '~/service-providers/components/ServiceProviderAdd';

export default function spAdd() {
  return (
    <div className="flex">
    <div className="flex-1"></div>
    <div className="shrink-0 w-1/2">
      <Card className="p-4">
        <CardTitle>New Service Provider</CardTitle> 
        <Separator className="border-gray-200 mt-2" orientation="horizontal"/>
        <ServiceProviderAdd/>
      </Card>
    </div>
    <div className="flex-1"></div>
  </div>
  )
}
