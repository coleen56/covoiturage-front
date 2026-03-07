import PageTitle from "@/components/ui/PageTitle";
import Main from "@/components/ui/Main";
import {getProfile} from "@/app/profile/actions";
import ProfileForm from "@/app/profile/profile-form";

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