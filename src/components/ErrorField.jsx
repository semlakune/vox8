import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function ErrorField({ action = () => window.location.reload() }) {
  return (
    <div
      className={
        "w-full h-full p-5 flex flex-col gap-5 justify-center items-center"
      }
    >
      <ExclamationTriangleIcon className={"w-10 h-10 text-red-500"} />
      <h1>Something went wrong</h1>
      <Button variant={"ghost"} onClick={action}>
        <ReloadIcon className="mr-2 h-4 w-4" /> Reload
      </Button>
    </div>
  );
}
