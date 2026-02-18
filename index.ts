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

const searchJobs = async (profession: string, city: string) => {
  try {
    // Combine profession and city into a single search query
    const query = `${profession} ${city}`.trim();

    // EncodeURIComponent makes special characters URL-safe (e.g. "Malmö" → "Malm%C3%B6")
    const url = `https://jobsearch.api.jobtechdev.se/search?q=${encodeURIComponent(query)}&offset=0&limit=10`;
    const response = await fetch(url);

    // Fetch doesn't throw on HTTP errors (404, 500) — only on network failures
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      return;
    }

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
    // Catches network failures (no internet, DNS errors, etc.)
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Failed to fetch jobs: ${message}`);
  }
};

const runApp = () => {
  console.log('Welcome to the Job Search App!');
  console.log('This app searches for jobs using JobTech API');
  const profession = 'Software Developer';
  const city = 'Malmö';
  console.log(`\nSearching for: ${profession} in ${city}`);
  searchJobs(profession, city);
};

runApp();
