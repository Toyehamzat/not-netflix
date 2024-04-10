// // watch/[movieId]/route.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/prisma";
// import serverAuth from "@/lib/serverAuth";

// export default async function handler(req: NextApiRequest) {
//   try {
//     // if (req.method !== "GET") {
//     //   return { status: 405, body: "Method Not Allowed" };
//     // }

//     await serverAuth();

//     const { movieId } = req.query;

//     if (!movieId || typeof movieId !== "string") {
//       throw new Error("Invalid or missing movieId");
//     }

//     const movie = await prisma.movie.findUnique({
//       where: {
//         id: movieId,
//       },
//     });

//     if (!movie) {
//       throw new Error("Movie not found");
//     }

//     return { status: 200, body: movie };
//   } catch (error) {
//     console.error(error);
//     return { status: 500, body: "Internal Server Error" };
//   }
// }
