'use server'

import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function createContact(person, phone) {
    const result = await prisma.person.create({
        data: person
    });
    phone = {
        ...phone,
        id_person: result.id
    }
    createPhone(phone);
}

export async function createPhone(phone) {
    const result = await prisma.phone.create({
        data: phone
    })

    return result;
}

export async function removeContact(id) {
    await prisma.phone.deleteMany({
        where: {
            id_person: id
        }
    });

    const result = await prisma.person.delete({
        where: {
            id: id
        },
    });
}

export async function getAllContacts() {
    const results = await prisma.person.findMany({
        orderBy: {
            name: 'asc'
        },
        include: {
            phone: true
        }
    });

    return results;
}

export async function getContactById(id) {
    const result = await prisma.person.findFirst({
        where: {
            id: id
        },
        include: {
            phone: true
        }
    });

    return result;
}

export async function getContactsWithFilter(value) {
    const results = await prisma.person.findMany({
        where: {
            OR: [
                { name: { contains: value } },
                { email: { contains: value } },
            ]
        },
        include: {
            phone: {
                where: {
                    OR: [
                        { phone: {contains: value} }
                    ]
                }
            }
        }
    });

    return results;
}