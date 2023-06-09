// TODO 6 - Call buy_ticket entrypoint in the Lottery contract by completing buyTicketOperation
import { tezos } from "./tezos"
// import { getBalance } from "./tezos";

// gets the buyTicket operation from the lottery smart contract
export const buyTicketOperation = async (numTickets) => {
    try{
        //get the smart contract from tezos wallet by giving the address of the smart contract
        const contract = await tezos.wallet.at("KT1FhUAwBW3SYCNvSXd8QC4t75uuh6RfxXFB");
        // get the methot buy_ticket() and for the parameters
        // amount = number of tickets to be passed in
        // not a mutez

        console.log("getting the ticket");
        const op = await contract.methods.buy_ticket(numTickets).send(
            {
            amount: numTickets,
            mutez: false,
        }
        )
        await op.confirmation(1);
    }
    catch(err){
        throw err;
    }
};


// TODO 10 - Call end_game entrypoint in the Lottery contract by completing endGameOperation

export const endGameOperation = async () => {
    try{
        const contract = await tezos.wallet.at("KT1FhUAwBW3SYCNvSXd8QC4t75uuh6RfxXFB")
        // Generates a random number to randomly select the winner
        const random_number = Math.round(Math.random() * 10000000)
        // sends the random number to the end_game endpoint
        const op = await contract.methods.end_game(random_number).send()
        await op.confirmation(1)
    }
    catch (err){
        throw err;
    }
};

export const changeMaxTicketsOperation = async(newMaxTickets) =>{
    try{
        const contract = await tezos.wallet.at("KT1FhUAwBW3SYCNvSXd8QC4t75uuh6RfxXFB")
        const op = await contract.methods.change_max_tickets(newMaxTickets).send()
        await op.confirmation(1);
    }
    catch (err){
        throw err;
    }

};

export const changeTicketCostOperation = async(newTicketCost) => {
    try{
        const contract = await tezos.wallet.at("KT1FhUAwBW3SYCNvSXd8QC4t75uuh6RfxXFB")
        const op = await contract.methods.change_ticket_cost(newTicketCost).send()
        await op.confirmation(1);
    }
    catch (err){
        throw err;
    }
};