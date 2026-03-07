import {Car, User} from "@/types/carpool";
import {getUserProfile} from "@/lib/auth";

export async function getProfile(): Promise<User> {
    return await getUserProfile();
}

export async function getCar(): Promise<Car> {

}