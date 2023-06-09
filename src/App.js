import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import { buyTicketOperation, endGameOperation } from "./utils/operation";
import { fetchStorage } from "./utils/tzkt";

const App = () => {
  // Players holding lottery tickets
  const [players, setPlayers] = useState([]);
  const [tickets, setTickets] = useState(5);
  const [loading, setLoading] = useState(false);
  const [ticketValue, setTicketValue] = useState("");

  // Set players and tickets remaining
  useEffect(() => {
    // TODO 9 - Fetch players and tickets remaining from storage
    
    (async () => {
      const storage = await fetchStorage();
      setPlayers(Object.values(storage.players));
      setTickets(storage.tickets_available);
    })();
  }, []);

  // TODO 7.a - Complete onBuyTicket function
  const onBuyTicket = async (event) => {
    event.preventDefault();
    const numOfTickets = ticketValue ? parseInt(ticketValue) : 0;
    console.log(`Input value: ${numOfTickets}`);
    
    try{
      setLoading(true)
      await buyTicketOperation(numOfTickets)
      alert("Transaction successful")
    }
    catch(err){
      alert("Transaction failed: ", err.message);
    }
    setLoading(false)

  };

  // TODO 11.a - Complete onEndGame function
  const onEndGame = async () => {
    try {
      setLoading(true)
      await endGameOperation()
      alert("Transation successful")
    } catch (error) {
      throw error
    }
    setLoading(false)

  };

  const handleInputChange = (event) => {
    setTicketValue(event.target.value);
  };

  return (
    <div className="h-100">
      <Navbar />
      <div 
      className="d-flex flex-column justify-content-center align-items-center h-100"
      >
        {/* Ticket remaining display */}
        <div className="py-1">Tickets remaining: {tickets}</div>
        {/* Action Buttons */}

        {tickets > 0 ? (
          <form class="form-inline">
            <div class="form-group mb-2">
              <input type="number" class="form-control" pattern="[0-9]*" placeholder="Number of tickets to purchase" value={ticketValue} onChange={handleInputChange}  />
            </div>
            
            <button onClick={onBuyTicket} className="btn btn-primary btn-lg ">
              {/* TODO 7.b - Call onBuyTicket on click */}
              {/* TODO 7.c - Show "loading..." when buying operation is pending */}
              { loading ? "Loading..." : "Buy Ticket"}
            </button>
          </form>
            
        ) : (
          <button onClick={onEndGame} className="btn btn-success btn-lg">
            {/* TODO 11.b - Call onEndGame on click */}
            {/* TODO 11.c - Show "loading..." when buying operation is pending */}
            { loading ? "Loading.." : "End Game"}
          </button>
        )}
        {/* List of Players */}
        <div className="mt-2">
          {players.map((player, index) => (
            <div key={index}>
              <b>Purchase {index + 1}:</b> {player}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
