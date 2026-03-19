import ErrorAlert from "@/components/ui/alerts/ErrorAlert";
import SuccessAlert from "@/components/ui/alerts/SuccessAlert";
import { ActionState } from "@/app/(auth)/login/actions";

export default function StateAlerts({ state }: Readonly<{ state: ActionState }>) {
    if (!state) return null;
    if ('error' in state) return <ErrorAlert message={state.error} />
    if ('success' in state) return <SuccessAlert message={(state as { success: string }).success} />
    return null;
}