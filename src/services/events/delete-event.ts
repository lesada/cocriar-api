import { prisma } from "@/lib/prisma"

interface DeleteEventsService {
  id: string
}

export async function deleteEventsService({id} : DeleteEventsService) {
  const event = await prisma.event.findUnique({
    where: { id }
  })

  if (!event) {
    throw new Error("Evento não encontrado")
  }

  await prisma.event.delete({
    where: { id }
  })
}