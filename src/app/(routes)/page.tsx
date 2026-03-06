import createMetadataTitle from "@/app/utils/createMetadataTitle";
import AppView from "../components/views/AppView";
import { createSSRCaller } from "@/server/caller";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = createMetadataTitle({
  title: "To Do List",
  description: "Main Page",
});

export const dynamic = "force-dynamic";

export default async function Page() {

  // get all tasks using SSR method
  const caller = createSSRCaller();
  const taskList = await caller.getAll();

  return <AppView taskList={taskList} />;
}
