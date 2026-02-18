"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, BookOpen, DollarSign, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface TutorProfileCardProps {
    id: number;
    userId: string;
}

type Tutor = {
    id: number;
    userId: string;
    bio: string;
    pricePerHr: number;
    rating: number;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
    categories: string[];
};

export function TutorProfileCard({ id }: TutorProfileCardProps) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [tutor, setTutor] = useState<Tutor | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTutor = async () => {
            try {
                const res = await fetch(`${API_URL}/api/tutors/${id}`, {
                    credentials: "include",
                });
                const json = await res.json();
                if (!json.success) throw new Error(json.message);
                setTutor(json.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTutor();
    }, [id]);

    if (loading)
        return (
            <div className="flex justify-center items-center p-10">
                <Spinner className="size-8 text-primary" />
            </div>
        );

    if (error)
        return (
            <div className="text-red-500 font-medium p-4 border rounded-md dark:border-red-600 dark:bg-red-100/10">
                Something Went Wrong Plseace try Again
            </div>
        );

    return (
        <Card className="border-red-500 w-sm rounded-2xl shadow-md border dark:border-green-500 bg-white dark:bg-black">
            <CardHeader className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${tutor?.user.name}`} />
                    <AvatarFallback>{tutor?.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        {tutor?.user.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
                        <Mail className="h-4 w-4" /> {tutor?.user.email}
                    </div>
                    {tutor?.bio && (
                        <p className="text-sm text-muted-foreground dark:text-gray-300">{tutor.bio}</p>
                    )}
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {tutor?.categories && tutor.categories.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold flex items-center gap-2 mb-2 dark:text-gray-200">
                            <BookOpen className="h-4 w-4" /> Expertise
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {tutor.categories.map((cat) => (
                                <Badge key={cat} variant="secondary">
                                    {cat}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                        <DollarSign className="h-4 w-4" /> TK. {tutor?.pricePerHr}/hr
                    </div>

                    <div className="flex items-center gap-1 text-sm font-medium text-yellow-500">
                        <Star className="h-4 w-4" /> {tutor?.rating.toFixed(1)}
                    </div>
                </div>

                <Button className={cn("rounded-xl mt-4", "bg-primary text-white hover:bg-primary/90 dark:bg-green-500 dark:hover:bg-green-600")}>
                    Edit Profile
                </Button>
            </CardContent>
        </Card>
    );
}
