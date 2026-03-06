import { trpc } from "@/app/client/trpc";
import { useRouter } from "next/navigation";
import { getTRPCErrorMessage } from "../utils/handleError";

function getInstances() {
  const utils = trpc.useUtils();
  const router = useRouter();
  return { utils, router };
}

export function updateMutateHook({
  showToast,
  handleClose,
}: {
  showToast: any;
  handleClose: any;
}) {
  const { router, utils } = getInstances();
  return trpc.update.useMutation({
    onSuccess: async () => {
      await utils.getAll.invalidate();
      router.refresh();
      showToast("Task updated!", "success");
      handleClose();
    },
    onError: (error) => {
      const message = getTRPCErrorMessage(error);
      showToast(message, "error");
    },
  });
}

export function createMutateHook({
  showToast,
  handleClose,
}: {
  showToast: any;
  handleClose: any;
}) {
  const { router, utils } = getInstances();
  return trpc.create.useMutation({
    onSuccess: async () => {
      await utils.getAll.invalidate();
      router.refresh();
      showToast("Task created!", "success");
      handleClose();
    },
    onError: (error) => {
      const message = getTRPCErrorMessage(error);
      showToast(message, "error");
    },
  });
}

export function deleteMutateHook({ showToast }: { showToast: any }) {
  const { router, utils } = getInstances();
  return trpc.delete.useMutation({
    onSuccess: async () => {
      await utils.getAll.invalidate();
      router.refresh();
      showToast("Task removed!", "success");
    },
    onError: (error) => {
      const message = getTRPCErrorMessage(error);
      showToast(message, "error");
    },
  });
}
