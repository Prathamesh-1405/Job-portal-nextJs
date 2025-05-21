// "use client"
// import React, { ChangeEvent, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { motion } from "framer-motion";
// import Navbar from "@/components/ui/navbar";

// interface Job {
//   id: number;
//   title: string;
//   company: string;
//   location: string;
// }

// const jobsData: Job[] = [
//   { id: 1, title: "Frontend Developer", company: "Techify", location: "Remote" },
//   { id: 2, title: "Backend Engineer", company: "CloudNet", location: "San Francisco" },
//   { id: 3, title: "UI/UX Designer", company: "CreativeHub", location: "New York" },
// ];

// export default function JobPortal() {
//   const [search, setSearch] = useState<string>("");

//   const filteredJobs = jobsData.filter(
//     (job) =>
//       job.title.toLowerCase().includes(search.toLowerCase()) ||
//       job.company.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//   };

//   return (
//     <>
//     <Navbar/>
//     <div className="max-w-4xl mx-auto p-6">
      
//       {/* <h1 className="text-3xl font-bold mb-6">Job Portal</h1> */}
//       {/* <div className="mb-4">
//         <Input
//           placeholder="Search by job title or company..."
//           value={search}
//           onChange={handleSearchChange}
//         />
//       </div> */}
//       <div className="grid gap-4">
//         {filteredJobs.map((job) => (
//           <motion.div
//             key={job.id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Card className="rounded-2xl shadow-lg">
//               <CardContent className="p-4">
//                 <h2 className="text-xl font-semibold">{job.title}</h2>
//                 <p className="text-gray-600">{job.company} - {job.location}</p>
//                 <Button className="mt-3">Apply Now</Button>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//         {filteredJobs.length === 0 && (
//           <p className="text-center text-gray-500">No jobs found.</p>
//         )}
//       </div>
//     </div>
//     </>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  salaryRange?: string;
  company?: {
    name: string;
  };
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/jobs");  // Axios GET request
      if (res.data.success) {
        setJobs(res.data.data);
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Latest Job Listings</h1>

      {loading ? (
        <p className="text-gray-600">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-600">No jobs available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Card key={job._id} className="p-4 hover:shadow-lg transition duration-300">
              <CardContent>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
                <p className="text-sm text-gray-500 mb-1">{job.company?.name || "Unknown Company"}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="outline">{job.type}</Badge>
                  <Badge variant="outline">{job.location}</Badge>
                  {job.salaryRange && <Badge variant="outline">{job.salaryRange}</Badge>}
                </div>
                <p className="text-gray-700 mb-4">
                  {job.description.length > 100
                    ? `${job.description.slice(0, 100)}...`
                    : job.description}
                </p>
                <Link href={`/jobs/${job._id}`}>
                  <Button>View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
