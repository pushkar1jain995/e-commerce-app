"use client";
import Link from 'next/link';
import { useSession, signOut, signIn } from "next-auth/react"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function Home() {
  // const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (!session) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-screen">
  //       <h1 className="text-2xl font-bold mb-4">Welcome to the Image Gallery</h1>
  //       <p className="mb-4">Please sign in to view the gallery.</p>
  //       <div className="space-x-4">
  //         <Button onClick={() => signIn("github")}>Sign in with GitHub</Button>
  //         <Button onClick={() => signIn("google")}>Sign in with Google</Button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="container mx-auto ml-6 my-3">
      {/* <Card className="mb-8">
        <CardHeader>
          <CardTitle>Welcome, {session.user.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={session.user.image} />
              <AvatarFallback>{session.user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p>{session.user.email}</p>
            </div>
          </div>
          <Button onClick={() => signOut()}>Sign out</Button>
        </CardContent>
      </Card> */}
        <Link href={`/products`} className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600">All Products</Link>
      </div>
    </>
  );
}
