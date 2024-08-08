import { Card, CardTitle } from "@wg-frontend/ui/card";
import { Separator } from "@wg-frontend/ui/separator";

import ServiceProviderAdd from "~/service-providers/components/ServiceProviderAdd";

export default function spAdd() {
  return (
    <div className="flex">
      <div className="flex-1"></div>
      <div className="w-1/2 shrink-0">
        <Card className="p-4">
          <CardTitle>New Service Provider</CardTitle>
          <Separator
            className="mt-2 border-gray-200"
            orientation="horizontal"
          />
          <ServiceProviderAdd />
        </Card>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
