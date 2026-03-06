import { trpc } from "@/app/client/trpc";
import { useRouter } from "next/navigation";
import { getTRPCErrorMessage } from "../utils/handleError";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type TRPCUtils = ReturnType<typeof trpc.useUtils>;
type showToastType = (
  message: string,
  severity?: "success" | "error" | undefined,
) => void;

type handleCloseType = () => void;

function getInstances() {
  const utils = trpc.useUtils();
  const router = useRouter();
  return { utils, router };
}

async function refreshCache(router: AppRouterInstance, utils: TRPCUtils) {
  // invalidate client side cache .
  await utils.getAll.invalidate();
  // force to re-render the Server Components of current route.
  router.refresh();
}

export function updateMutateHook({
  showToast,
  handleClose,
}: {
  showToast: showToastType;
  handleClose: handleCloseType;
}) {
  const { router, utils } = getInstances();
  return trpc.update.useMutation({
    onSuccess: async () => {
      await refreshCache(router, utils);
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
  showToast: showToastType;
  handleClose: handleCloseType;
}) {
  const { router, utils } = getInstances();
  return trpc.create.useMutation({
    onSuccess: async () => {
      await refreshCache(router, utils);
      showToast("Task created!", "success");
      handleClose();
    },
    onError: (error) => {
      const message = getTRPCErrorMessage(error);
      showToast(message, "error");
    },
  });
}

export function deleteMutateHook({ showToast }: { showToast: showToastType }) {
  const { router, utils } = getInstances();
  return trpc.delete.useMutation({
    onSuccess: async () => {
      await refreshCache(router, utils);
      showToast("Task removed!", "success");
    },
    onError: (error) => {
      const message = getTRPCErrorMessage(error);
      showToast(message, "error");
    },
  });
}
