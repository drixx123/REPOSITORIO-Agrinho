document.addEventListener('DOMContentLoaded', () => {
    const decreaseButtons = document.querySelectorAll('.decrease-quantity');
    const increaseButtons = document.querySelectorAll('.increase-quantity');
    const orderDetailsDiv = document.getElementById('order-details');
    const totalPriceSpan = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');

    let tickets = {
        individual: { quantity: 0, price: 80.00 },
        family: { quantity: 0, price: 280.00 },
        child: { quantity: 0, price: 50.00 }
    };

    function updateOrderSummary() {
        let total = 0;
        let detailsHtml = '';
        let hasTickets = false;

        for (const type in tickets) {
            if (tickets[type].quantity > 0) {
                hasTickets = true;
                const ticketPrice = tickets[type].quantity * tickets[type].price;
                total += ticketPrice;
                let ticketName = '';
                switch (type) {
                    case 'individual':
                        ticketName = 'Ingresso Individual';
                        break;
                    case 'family':
                        ticketName = 'Ingresso Família';
                        break;
                    case 'child':
                        ticketName = 'Ingresso Infantil';
                        break;
                }
                detailsHtml += `<p>${ticketName}: ${tickets[type].quantity} x R$ ${tickets[type].price.toFixed(2)} = R$ ${ticketPrice.toFixed(2)}</p>`;
            }
        }

        if (!hasTickets) {
            detailsHtml = '<p>Nenhum ingresso selecionado.</p>';
        }

        orderDetailsDiv.innerHTML = detailsHtml;
        totalPriceSpan.textContent = `R$ ${total.toFixed(2)}`;
    }

    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const ticketType = button.dataset.ticketType;
            if (tickets[ticketType].quantity > 0) {
                tickets[ticketType].quantity--;
                document.getElementById(`quantity-${ticketType}`).textContent = tickets[ticketType].quantity;
                updateOrderSummary();
            }
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const ticketType = button.dataset.ticketType;
            tickets[ticketType].quantity++;
            document.getElementById(`quantity-${ticketType}`).textContent = tickets[ticketType].quantity;
            updateOrderSummary();
        });
    });

    checkoutButton.addEventListener('click', () => {
        // This is a placeholder for actual checkout logic.
        // In a real application, you would send this data to a server
        // for payment processing and ticket generation.
        const selectedTickets = {};
        for (const type in tickets) {
            if (tickets[type].quantity > 0) {
                selectedTickets[type] = tickets[type].quantity;
            }
        }

        if (Object.keys(selectedTickets).length > 0) {
            alert('Funcionalidade de Finalizar Compra (Exemplo)\n\nVocê selecionou:\n' + JSON.stringify(selectedTickets, null, 2) + '\n\nEm um sistema real, você seria redirecionado para uma página de pagamento.');
        } else {
            alert('Por favor, selecione pelo menos um ingresso para finalizar a compra.');
        }
    });

    // Initial update when the page loads
    updateOrderSummary();
});