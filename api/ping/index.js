module.exports = async function (context, req) {
    // Get the user ID from Azure's injected header
    const principalName = req.headers['x-ms-client-principal-name'] || "Anonymous";
    
    context.log(`BentoPDF Hit: ${principalName}`);

    context.res = {
        status: 200, 
        body: "Pong"
    };
};