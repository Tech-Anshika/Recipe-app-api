import cron from "cron";
import https from "https";

// Run every 14 minutes
const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) {
        console.log("Cron job executed successfully");
      } else {
        console.log(`Cron job failed with status code: ${res.statusCode}`);
      }
    })
    .on("error", (e) => {
      console.error("Error executing cron job:", e);
    });
});

job.start(); // ✅ Important to start the job

export default job; // ✅ So it can be imported as default
