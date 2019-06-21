import axios from 'axios'


export default {
    // for initialization / reinit of state
    getMenu: () => {
        return axios.get("/menu")
    },

    getServers: ()=>{
        return axios.get("/servers")
    },

    getTables: ()=>{
        return axios.get("/check/unpaid")
    },

    seatGuests: (seating)=>{
        //seats new guests
        return axios.post("/check/seat",seating)
            .then(response =>{
                return response
            }).catch(error => {
                if (error) {
                    return error;
                }
            })
    },

    // place new order
    placeOrder: (order, dbresponse) => {
        return axios.put("/order/"+ order.bill.id, order)
            .then(response => {
                dbresponse(response);
                return response;
            })
            .catch(error => {
                return error;
            })
    },

    //change Table
    changeTable: (table) => {
        console.log('API call table:', table);
        console.log('table.bill.id:', table.bill.id);
        return axios.put("/check/updateTable/" + table.bill.id, table)
            .then(response =>{
                console.log('kalispera',response);
                console.log('oldTable', response.data.oldTable.table);
                return response
            }).catch(error => {
                if (error) {
                    console.log(error);
                    return error;
                }
            })
    },

    //checkout process
    submitPayment: (payment) => {
        let newPayment = {};
        newPayment.paid = true;
        newPayment.card = payment.card;
        newPayment.amountTendered = payment.amount;
        newPayment.paymentType = payment.paymentType;
        let URL = encodeURI("/check/"+payment.bill.id);
        return (
            axios.put(URL,newPayment)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    return error;
                })
        )
    },

    login:(code, setUser) => {
        return(
            axios.get(`/servers/login/${code}`)
                .then(response => {
                    setUser(response.data);
                    return response.data;
                })
                .catch(error => {
                    return error;
                })
        )
    },

    addServer: (server) => {
        if (server) {
        let newServer={};
        newServer.name = server.name;
        newServer.code = server.code;

            return (
                axios.post('/servers/add', newServer)
                    .then(response => {
                        return response;
                    })
                    .catch(error => {
                        return error;
                    })
            )
        }
    },

    addMenu: (item) => {
        if (item) {
            let newItem = {};
            newItem.name = item.name;
            newItem.description = item.description;
            newItem.cost = parseFloat(item.cost);
            newItem.category = item.category;
            return (
                axios.post('/menu/add', newItem)
                    .then(response => {
                        return response;
                    })
                    .catch(error => {
                        return error;
                    })
                )
            }

    }
}