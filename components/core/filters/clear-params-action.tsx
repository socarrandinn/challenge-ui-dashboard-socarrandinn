"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";
import React from "react";

type Props = {
  onClean: () => void;
  show: boolean;
  className?: string;
  notIcon?: boolean;
};
const CleanParamsAction = ({
  onClean,
  show,
  className,
  notIcon = false,
}: Props) => {
  if (!show) return null;
  return (
    <Tooltip>
      <TooltipTrigger asChild className={cn(className)}>
        <Button
          size={"sm"}
          onClick={onClean}
          variant="ghost"
          className="absolute right-1 p-0 hover:bg-transparent hover:text-primary"
        >
          {notIcon ? "Limpiar" : <IconX className={"hover:text-primary"} />}
        </Button>
      </TooltipTrigger>
      <TooltipContent dir="button">
        <p>Limpiar</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CleanParamsAction;
