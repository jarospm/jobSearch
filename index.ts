// A function that searches for jobs
// A function that runs our app
// the command to start everything

const searchJobs = async (keyword: string) => {
  try {
    const result = `https://jobsearch.api.jobtechdev.se/search?q=${keyword}&offset=0&limit=10`;
    const response = await fetch(result);
    const data = await response.json();

    console.log(`\nFound ${data.hits.length} jobs`);
    console.log("-".repeat(50));
    //console.log(data);

    data.hits.forEach((job: any, index: number) => {
      const pubDate = new Date(job.publication_date);
      //console.log("pubDate: ", pubDate);

      console.log(`${index + 1}. ${job.headline}`);
      console.log(`Company: ${job.employer.name}`);
      console.log(`Location: ${job.workplace_address.municipality}`);
      console.log(`Publication: ${pubDate.toISOString().split("T")[0]}`);
      console.log("-".repeat(50));
    });
  } catch (error) {
    console.error(error);
  }
};

const runApp = () => {
  try {
    console.log("Welcome to the Job Search App!");
    console.log("This app searches for jobs using JobTeach API");
    const keyword = "Helsingborg";
    searchJobs(keyword);
  } catch (error) {
    console.error(error);
  }
};

runApp();
