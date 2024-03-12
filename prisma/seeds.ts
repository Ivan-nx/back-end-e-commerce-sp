import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { disconnect } from "process";

const prisma = new PrismaClient()

const snacks = [
    {
        "snack": "burger",
        "name": "Mega",
        "description": "O artesanal tamanho família recheado com três carnes suculentas, queijo e bacon.",
        "price": 25.5,
        "image": "https://i.imgur.com/upjIUnG.jpg"
    },
    {
        "snack": "burger",
        "name": "Extra Bacon",
        "description": "Criado para os amantes de bacon, possui em todas as suas camadas bacon bem assado e ainda queijo e carne.",
        "price": 23.5,
        "image": "https://i.imgur.com/B4J04AJ.jpg"
    },
    {
        "snack": "burger",
        "name": "Tradicional",
        "description": "O simples também é delicioso, principalmente se envolver nossa carne artesanal e queijo.",
        "price": 12,
        "image": "https://i.imgur.com/Jz506jB.jpg"
    },
    {
        "snack": "burger",
        "name": "Big Carne",
        "description": "Uma carne artesanal de primeira qualidade com 4cm de altura e uma salada completa com alface, cebola, tomate e outros.",
        "price": 18,
        "image": "https://i.imgur.com/bF8EdBb.jpg"
    },
    {
        "snack": "burger",
        "name": "Carne dupla",
        "description": "Já pensou em comer aquele sanduíche com carne dupla e saborosa, recheada com queijo, molho e salada? Então você pensou exatamente nesse hambúrguer.",
        "price": 20,
        "image": "https://i.imgur.com/fdEY2kY.jpg"
    },
    {
        "snack": "burger",
        "name": "Egg 2xBacon",
        "description": "Criado para os amantes de bacon, possui em todas as suas camadas bacon bem assado e ainda queijo e carne.",
        "price": 23.5,
        "image": "https://i.imgur.com/B4J04AJ.jpg"
    },
    {
        "snack": "pizza",
        "name": "Calabresa",
        "description": "Pizza recheada com calabresa, cebola, mussarela, orégano e azeitona, tendo uma borda recheada com catupiry.",
        "price": 25,
        "image": "https://i.imgur.com/5rjJGkV.jpg"
    },
    {
        "snack": "pizza",
        "name": "Portuguesa",
        "description": "Pizza recheada com presunto, mussarela, ovo, cebola, azeitona, orégano, tomate e molho de tomate, tendo uma borda recheada com catupiry.",
        "price": 28.5,
        "image": "https://i.imgur.com/WCoyGoI.png"
    },
    {
        "snack": "pizza",
        "name": "Frango com Catupiry",
        "description": "Pizza recheada com frango, catupiry e brócolis, tendo uma borda recheada com catupiry.",
        "price": 24,
        "image": "https://i.imgur.com/BuXrO8d.jpg"
    },
    {
        "snack": "pizza",
        "name": "Napolitana",
        "description": "Pizza recheada com queijo, mussarela, tomate e couve, tendo uma borda recheada com catupiry.",
        "price": 30,
        "image": "https://i.imgur.com/u3DfvCE.jpg"
    },
    {
        "snack": "pizza",
        "name": "Mussarela",
        "description": "Pizza recheada com mussarela, tendo uma borda recheada com catupiry. ",
        "price": 20.5,
        "image": "https://i.imgur.com/kPNXpa0.jpg"
    },
    {
        "snack": "pizza",
        "name": "Marguerita",
        "description": "Pizza recheada com calabresa, mussarela, cebola, azeitona e orégano, tendo uma borda recheada com catupiry.",
        "price": 25.5,
        "image": "https://i.imgur.com/AsEfsZN.jpg"
    },
    {
        "snack": "pizza",
        "name": "Brigadeiro com Morango",
        "description": "Pizza doce recheada com brigadeiro e morango.",
        "price": 35,
        "image": "https://i.imgur.com/43yC2Ap.jpg"
    },
    {
        "snack": "pizza",
        "name": "Banana",
        "description": "Pizza doce recheada com banana e leite condensado.",
        "price": 33.5,
        "image": "https://i.imgur.com/Pcrgg1P.jpg"
    },
    {
        "snack": "pizza",
        "name": "Chocolate",
        "description": "Pizza doce recheada com chocolate e bolinhas de chocolate.",
        "price": 30,
        "image": "https://i.imgur.com/RahAKkH.jpg"
    },
    {
        "snack": "drink",
        "name": "Coca-Cola 2L",
        "description": "A tradicional Coca-Cola que a família brasileira adora.",
        "price": 12,
        "image": "https://i.imgur.com/Lg3aKhf.jpg"
    },
    {
        "snack": "drink",
        "name": "Guaraná Antarctica",
        "description": "O irresistível e saboroso Guaraná Antarctica em sua versão de latinha.",
        "price": 6.5,
        "image": "https://i.imgur.com/hOBrOIm.jpg"
    },
    {
        "snack": "drink",
        "name": "Suco de Abacaxi",
        "description": "Suco natural de abacaxi com leves incrementos de algumas hortaliças para fortificar sua saúde.",
        "price": 8,
        "image": "https://i.imgur.com/VV9qTMh.jpg"
    },
    {
        "snack": "drink",
        "name": "Suco de Laranja",
        "description": "Suco natural de laranja para você que é amante dessa fruta.",
        "price": 8,
        "image": "https://i.imgur.com/2Lf2gHy.jpg"
    },
    {
        "snack": "ice-cream",
        "name": "Casquinha",
        "description": "A casquinha crocante e saborosa que nossos clientes amam.",
        "price": 4.5,
        "image": "https://i.imgur.com/YGmeoCm.jpg"
    },
    {
        "snack": "ice-cream",
        "name": "Chocolate com granulado",
        "description": "Sorvete de chocolate com granulados em chocolate para você se deliciar.",
        "price": 6,
        "image": "https://i.imgur.com/osAHOLe.jpg"
    },
    {
        "snack": "ice-cream",
        "name": "Flocos",
        "description": "O tradicional flocos vem com cobertura em chocolate para adocicar seu dia.",
        "price": 7,
        "image": "https://i.imgur.com/qgnFLiy.jpg"
    },
    {
        "snack": "ice-cream",
        "name": "Creme",
        "description": "O simples sorvete de creme com um gosto irresistível.",
        "price": 6.5,
        "image": "https://i.imgur.com/dFLysrT.jpg"
    },
    {
        "snack": "ice-cream",
        "name": "Morango",
        "description": "O clássico sorvete de morango que deixe tudo mais leve.",
        "price": 10,
        "image": "https://i.imgur.com/0TWnEI7.jpg"
    }
]

async function main() {
    await prisma.snack.createMany({
        data: snacks,
        skipDuplicates: true,
    })
}

main()
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
