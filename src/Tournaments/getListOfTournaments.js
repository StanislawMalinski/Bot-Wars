
export const getListOfTournaments = () => {
    return [
        {
            id: 1, 
            name: 'Nazwa turnieju 1', 
            description: 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', 
            gameType: 'Szachy',
            participantsAmount: 4, 
            maxParticipants: 6, 
            date: '2023-12-13', 
            limitations: 'nie można biegać', 
            state: 'ok',  
            image: '../resources/icons8-male-user-50.png'
        },
        {
            id: 2, 
            name: 'Nazwa turnieju 2', 
            description: 'Opis turnieju 2 asdigaoiefbhdqi webfpqieuh qpirehbfu eqriuubf qierbnfpiruebnf piqewr  ubnf piw    ebnf pe iw2ub pi;eub fp iwefub  pweibu', 
            gameType: 'Warcaby',
            participantsAmount: 2, 
            maxParticipants: 4, 
            date: '2023-12-23', 
            limitations: 'nie można skakać', 
            state: 'nie ok',  
            image: './resources/icons8-male-user-50.png'
        },
        {
            id: 3, 
            name: 'Nazwa turnieju 2', 
            description: 'Opis turnieju 2 asdigaoiefbhdqi webfpqieuh qpirehbfu eqriuubf qierbnfpiruebnf piqewr  ubnf piw    ebnf pe iw2ub pi;eub fp iwefub  pweibu', 
            gameType: 'Warcaby',
            participantsAmount: 2, 
            maxParticipants: 4, 
            date: '2024-12-23', 
            limitations: 'nie można skakać', 
            state: 'nie ok',  
            image: './resources/icons8-male-user-50.png'
        }
    ]
};