import type { Prisma } from '@prisma/client'
import type { QueryResolvers, CommentRelationResolvers } from 'types/graphql'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const comments: QueryResolvers['comments'] = ({
  postId,
}: Required<Pick<Prisma.CommentWhereInput, 'postId'>>) => {
  return db.comment.findMany({
    where: { postId },
  })
}

export const Comment: CommentRelationResolvers = {
  post: (_obj, { root }) => {
    return db.comment.findUnique({ where: { id: root?.id } }).post()
  },
}

interface CreateCommentArgs {
  input: Prisma.CommentCreateInput
}

export const createComment = ({ input }: CreateCommentArgs) => {
  return db.comment.create({
    data: input,
  })
}

export const deleteComment: QueryResolvers['comment'] = ({ id }) => {
  requireAuth({ roles: 'moderator' })
  return db.comment.delete({
    where: { id },
  })
}
