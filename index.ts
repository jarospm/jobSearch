// Types for the JobTech API response
interface Employer {
  name: string;
}

interface WorkplaceAddress {
  municipality: string;
}

interface Job {
  headline: string;
  employer: Employer;
  workplace_address: WorkplaceAddress;
  publication_date: string;
}

interface SearchResponse {
  hits: Job[];
}

const searchJobs = async (keyword: string) => {
  try {
    const url = `https://jobsearch.api.jobtechdev.se/search?q=${keyword}&offset=0&limit=10`;
    const response = await fetch(url);
    const data = (await response.json()) as SearchResponse;

    console.log(`\nFound ${data.hits.length} jobs`);
    console.log('-'.repeat(50));

    data.hits.forEach((job: Job, index: number) => {
      const pubDate = new Date(job.publication_date);

      console.log(`${index + 1}. ${job.headline}`);
      console.log(`Company: ${job.employer.name}`);
      console.log(`Location: ${job.workplace_address.municipality}`);
      console.log(`Publication: ${pubDate.toISOString().split('T')[0]}`);
      console.log('-'.repeat(50));
    });
  } catch (error) {
    console.error(error);
  }
};

const runApp = () => {
  try {
    console.log('Welcome to the Job Search App!');
    console.log('This app searches for jobs using JobTech API');
    const keyword = 'Helsingborg';
    searchJobs(keyword);
  } catch (error) {
    console.error(error);
  }
};

runApp();
