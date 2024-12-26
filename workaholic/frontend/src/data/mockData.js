// Mock data for bar chart
export const mockBarData = [
    { country: "USA", jobs: 500, applications: 200 },
    { country: "UK", jobs: 300, applications: 150 },
    { country: "Germany", jobs: 450, applications: 180 },
    { country: "India", jobs: 600, applications: 400 },
    { country: "Canada", jobs: 350, applications: 220 },
  ];
  
  // Mock data for pie chart
  export const mockPieData = [
    { id: "Full-time", value: 450 },
    { id: "Part-time", value: 250 },
    { id: "Freelance", value: 300 },
  ];
  
  // Mock data for line chart
  export const mockLineData = [
    {
      id: "Jobs Posted",
      data: [
        { x: "January", y: 150 },
        { x: "February", y: 200 },
        { x: "March", y: 180 },
        { x: "April", y: 220 },
        { x: "May", y: 300 },
      ],
    },
    {
      id: "Applications Received",
      data: [
        { x: "January", y: 100 },
        { x: "February", y: 140 },
        { x: "March", y: 120 },
        { x: "April", y: 160 },
        { x: "May", y: 200 },
      ],
    },
  ];
  
  // Mock data for statistics (StatBox)
  export const mockStatistics = [
    { title: "Total Users", value: "12,345", growth: "+5%" },
    { title: "Active Companies", value: "345", growth: "+2%" },
    { title: "Jobs Posted", value: "789", growth: "+8%" },
    { title: "Applications", value: "4,567", growth: "+10%" },
  ];
  
  // Mock data for a table (e.g., user table)
  export const mockUserTable = [
    { id: "U001", userName: "JohnDoe", email: "john@example.com", role: "Admin" },
    { id: "U002", userName: "JaneSmith", email: "jane@example.com", role: "Employer" },
    { id: "U003", userName: "BobBrown", email: "bob@example.com", role: "Job Seeker" },
    { id: "U004", userName: "AliceGreen", email: "alice@example.com", role: "Employer" },
    { id: "U005", userName: "TomWhite", email: "tom@example.com", role: "Job Seeker" },
  ];
  
  // Mock data for recent transactions (e.g., Dashboard)
  export const mockTransactions = [
    { txId: "T001", user: "JohnDoe", date: "2024-01-05", amount: "$120.00" },
    { txId: "T002", user: "JaneSmith", date: "2024-01-06", amount: "$340.00" },
    { txId: "T003", user: "BobBrown", date: "2024-01-07", amount: "$50.00" },
    { txId: "T004", user: "AliceGreen", date: "2024-01-08", amount: "$450.00" },
    { txId: "T005", user: "TomWhite", date: "2024-01-09", amount: "$90.00" },
  ];
  