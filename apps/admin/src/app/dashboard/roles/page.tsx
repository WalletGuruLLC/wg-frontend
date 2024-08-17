"use client";

import { Button } from "~/components/button";
import Dialog from "../_components/dashboard-dialog";

export default function WalletsPage() {
  return (
    <div>
      <Dialog
        trigger={<Button>Open</Button>}
        actions={[
          <Button className="w-full" key="save">
            Save
          </Button>,
          <Button className="w-full" key="save2">
            Save2
          </Button>,
        ]}
      >
        <div>Dialog content</div>
      </Dialog>
    </div>
  );
}
