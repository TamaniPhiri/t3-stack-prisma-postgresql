import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const idSchema=z.object({id:z.string()});

const userSchema=z.object({
  name:z.string(),
  email:z.string(),
});

const userUpdateSchema=z.object({
  name:z.string(),
  email:z.string(),
  id:z.string(),
});

export const exampleRouter = createTRPCRouter({
  //get all users
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.client.findMany()
  }),

  //get user by id
  getOne: publicProcedure
    .input(idSchema)
    .query(({input,ctx }) => {
      return ctx.prisma.client.findUnique({
        where:idSchema.parse(input)
      })
    }),

    //create a new user
    createUser:publicProcedure
    .input(userSchema)
    .mutation(({input,ctx}) => {
      return ctx.prisma.client.create({
        data:userSchema.parse(input)
      });
    }),

    //update a user
    updateUser:publicProcedure
    .input(userUpdateSchema)
    .mutation(({input,ctx}) => {
      return ctx.prisma.client.update({
        where:{
          id:input.id.toString()
        },
        data:userUpdateSchema.parse(input)
      });
    }),

    //delete a user
    deleteUser:publicProcedure
    .input(idSchema)
    .mutation(({input,ctx}) => {
      return ctx.prisma.client.delete({
        where: {
          id:idSchema.parse(input)
        }
      });
    }),
});
