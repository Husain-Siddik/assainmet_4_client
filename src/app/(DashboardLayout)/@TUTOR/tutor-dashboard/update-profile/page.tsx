import { UpdateTutorForm } from "@/components/modules/tutor/updateTutorProfile/updateTutorFrom";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tutorService } from "@/services/tutor.service";


const TutorProfileUpdatePage = async () => {

    const { data, error } = await tutorService.getTutorByUser();

    if (error || !data) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Card className="border-red-500 bg-red-50 max-w-md w-full">
                    <CardHeader>
                        <CardTitle className="text-red-600">Oops!</CardTitle>
                        <CardDescription className="text-red-700">
                            {"Tutor profile not found."}
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    const tutorProps = {
        id: data.data.id,
        bio: data.data.bio,
        pricePerHr: data.data.pricePerHr,
        userId: data.data.userId,

    };

    return (
        <div className=" flex justify-center py-10">

            <UpdateTutorForm tutor={tutorProps} />
        </div>
    );
};

export default TutorProfileUpdatePage;