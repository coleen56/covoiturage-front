import PageTitle from "@/components/ui/layout/PageTitle";
import Main from "@/components/ui/layout/Main";
import {getProfile} from "@/app/(private)/profile/actions";
import ProfileForm from "@/app/(private)/profile/components/ProfileForm";
import {Metadata} from "next";

export const metadata: Metadata = { title: 'Mon profil' }

export default async function ProfilePage() {
    const profile = await getProfile();
    return (
        <Main>
            <PageTitle>
                Mon profil
            </PageTitle>
            <ProfileForm user={profile} />
        </Main>
    )
}