module.exports = async (client) => {
    console.log("\nBot started!\n");

    // Check for new posts on Reddit
    client.redditCheck();
}
