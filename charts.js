document.addEventListener('DOMContentLoaded', () => {
    // --- Shared Configuration ---
    const commonOptions = {
        responsive: true,
        plugins: {
            legend: {
                labels: { color: document.body.getAttribute('data-theme') === 'dark' ? '#fff' : '#333' }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255,255,255,0.1)' },
                ticks: { color: '#888' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#888' }
            }
        }
    };

    // Check which dashboard acts
    const isAdmin = document.getElementById('adminTrafficChart');
    const isUser = document.getElementById('userTicketChart');

    // --- ADMIN DASHBOARD CHARTS ---
    if (isAdmin) {
        // 1. Traffic Overview (Line)
        new Chart(document.getElementById('adminTrafficChart'), {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [{
                    label: 'Network Traffic (GB/s)',
                    data: [12, 19, 8, 25, 22, 15],
                    borderColor: '#6366f1',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(99, 102, 241, 0.2)'
                }]
            },
            options: commonOptions
        });

        // 2. Ticket Volume (Bar)
        new Chart(document.getElementById('adminTicketVolume'), {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Total Tickets',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: '#10b981',
                    borderRadius: 5
                }]
            },
            options: commonOptions
        });

        // 3. User Satisfaction (Doughnut)
        new Chart(document.getElementById('adminSatisfaction'), {
            type: 'doughnut',
            data: {
                labels: ['Satisfied', 'Neutral', 'Unsatisfied'],
                datasets: [{
                    data: [85, 10, 5],
                    backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                    borderWidth: 0
                }]
            },
            options: { ...commonOptions, scales: { x: { display: false }, y: { display: false } } }
        });

        // 4. Issue Categories (Pie)
        new Chart(document.getElementById('adminCategories'), {
            type: 'pie',
            data: {
                labels: ['Hardware', 'Software', 'Network', 'Access'],
                datasets: [{
                    data: [30, 40, 20, 10],
                    backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316'],
                    borderWidth: 0
                }]
            },
            options: { ...commonOptions, scales: { x: { display: false }, y: { display: false } } }
        });

        // 5. Server CPU Load (Line)
        new Chart(document.getElementById('adminCpuLoad'), {
            type: 'line',
            data: {
                labels: ['1m', '2m', '3m', '4m', '5m'],
                datasets: [{
                    label: 'CPU Load %',
                    data: [45, 50, 48, 60, 55],
                    borderColor: '#ef4444',
                    tension: 0.3
                }]
            },
            options: commonOptions
        });

        // 6. Security Threats (Radar)
        new Chart(document.getElementById('adminSecurity'), {
            type: 'radar',
            data: {
                labels: ['Phishing', 'DDoS', 'Malware', 'Intrusion', 'Data Leak'],
                datasets: [{
                    label: 'Attacks Blocked',
                    data: [65, 59, 90, 81, 56],
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    borderColor: '#ef4444'
                }]
            },
            options: { ...commonOptions, scales: { r: { grid: { color: '#444' } } } }
        });

        // 7. Agent Performance (Bar)
        new Chart(document.getElementById('adminAgentPerf'), {
            type: 'bar',
            data: {
                labels: ['Agent A', 'Agent B', 'Agent C', 'Agent D'],
                datasets: [{
                    label: 'Resolved Tickets',
                    data: [120, 150, 100, 180],
                    backgroundColor: '#8b5cf6'
                }]
            },
            options: { indexAxis: 'y', ...commonOptions }
        });

        // 8. Revenue/Cost (Bar)
        new Chart(document.getElementById('adminRevenue'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar'],
                datasets: [
                    { label: 'Revenue', data: [5000, 6000, 7000], backgroundColor: '#10b981' },
                    { label: 'Cost', data: [2000, 2500, 3000], backgroundColor: '#ef4444' }
                ]
            },
            options: commonOptions
        });

        // 9. Geographic Load (Polar Area)
        new Chart(document.getElementById('adminGeoLoad'), {
            type: 'polarArea',
            data: {
                labels: ['USA', 'EU', 'Asia', 'LatAm'],
                datasets: [{
                    data: [11, 16, 7, 3],
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
                }]
            },
            options: { ...commonOptions, scales: { x: { display: false }, y: { display: false } } }
        });

        // 10. System Uptime (Line)
        new Chart(document.getElementById('adminUptime'), {
            type: 'line',
            data: {
                labels: ['W1', 'W2', 'W3', 'W4'],
                datasets: [{
                    label: 'Uptime %',
                    data: [99.9, 99.8, 99.95, 100],
                    borderColor: '#10b981',
                    stepped: true
                }]
            },
            options: commonOptions
        });

        // 11. Storage Growth (Line)
        new Chart(document.getElementById('adminStorageGrowth'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Storage (TB)',
                    data: [120, 145, 160, 190, 210, 230],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    fill: true
                }]
            },
            options: commonOptions
        });

        // 12. Support Tickets Distribution (Bar)
        new Chart(document.getElementById('adminTicketPriority'), {
            type: 'bar',
            data: {
                labels: ['Low', 'Medium', 'High', 'Critical'],
                datasets: [{
                    label: 'Tickets',
                    data: [450, 300, 120, 45],
                    backgroundColor: ['#10b981', '#f59e0b', '#f97316', '#ef4444']
                }]
            },
            options: commonOptions
        });

        // 13. System Memory Usage (Line)
        new Chart(document.getElementById('adminMemoryUsage'), {
            type: 'line',
            data: {
                labels: ['10:00', '10:10', '10:20', '10:30', '10:40', '10:50'],
                datasets: [{
                    label: 'Memory %',
                    data: [65, 72, 68, 85, 90, 78],
                    borderColor: '#8b5cf6',
                    tension: 0.1
                }]
            },
            options: commonOptions
        });

        // 14. Network Latency (Line)
        new Chart(document.getElementById('adminLatency'), {
            type: 'line',
            data: {
                labels: ['US-East', 'US-West', 'EU-West', 'Asia-South'],
                datasets: [{
                    label: 'Latency (ms)',
                    data: [25, 65, 110, 240],
                    borderColor: '#06b6d4',
                    borderWidth: 2
                }]
            },
            options: commonOptions
        });

        // 15. User Roles Breakdown (Pie)
        new Chart(document.getElementById('adminUserRoles'), {
            type: 'pie',
            data: {
                labels: ['Admins', 'Editors', 'Users', 'Guests'],
                datasets: [{
                    data: [5, 15, 70, 10],
                    backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#94a3b8']
                }]
            },
            options: { ...commonOptions, plugins: { legend: { position: 'bottom' } } }
        });

        // 16. API Requests (Radar)
        new Chart(document.getElementById('adminApiRequests'), {
            type: 'radar',
            data: {
                labels: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
                datasets: [{
                    label: 'Request Volume',
                    data: [95, 60, 40, 20, 35],
                    borderColor: '#ec4899',
                    backgroundColor: 'rgba(236, 72, 153, 0.2)'
                }]
            },
            options: commonOptions
        });

        // 17. Security Incidents (Bar)
        new Chart(document.getElementById('adminIncidentSeverity'), {
            type: 'bar',
            data: {
                labels: ['P1', 'P2', 'P3', 'P4'],
                datasets: [{
                    label: 'Incidents',
                    data: [2, 12, 45, 120],
                    backgroundColor: '#f43f5e'
                }]
            },
            options: commonOptions
        });

        // 18. Backup Success Rate (Doughnut)
        new Chart(document.getElementById('adminBackupSuccess'), {
            type: 'doughnut',
            data: {
                labels: ['Success', 'Failed', 'In-Progress'],
                datasets: [{
                    data: [98, 1, 1],
                    backgroundColor: ['#10b981', '#ef4444', '#3b82f6']
                }]
            },
            options: commonOptions
        });

        // 19. Node Status (Bar)
        new Chart(document.getElementById('adminNodeStatus'), {
            type: 'bar',
            data: {
                labels: ['Node 1', 'Node 2', 'Node 3', 'Node 4', 'Node 5'],
                datasets: [{
                    label: 'Requests/sec',
                    data: [1200, 950, 1100, 800, 1300],
                    backgroundColor: '#6366f1'
                }]
            },
            options: commonOptions
        });

        // 20. Session Duration (Line)
        new Chart(document.getElementById('adminSessionDuration'), {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    label: 'Duration (min)',
                    data: [12, 15, 14, 18, 20],
                    borderColor: '#10b981',
                    tension: 0.4
                }]
            },
            options: commonOptions
        });

    }

    // --- USER DASHBOARD CHARTS ---
    if (isUser) {
        // 1. My Ticket Status (Doughnut)
        new Chart(document.getElementById('userTicketChart'), {
            type: 'doughnut',
            data: {
                labels: ['Open', 'Resolved', 'Pending'],
                datasets: [{
                    data: [2, 15, 1],
                    backgroundColor: ['#ef4444', '#10b981', '#f59e0b'],
                    borderWidth: 0
                }]
            },
            options: { ...commonOptions, scales: { x: { display: false }, y: { display: false } } }
        });

        // 2. Service Usage History (Line)
        new Chart(document.getElementById('userServiceUsage'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr'],
                datasets: [{
                    label: 'Data Usage (GB)',
                    data: [50, 60, 55, 80],
                    borderColor: '#3b82f6',
                    fill: true,
                    backgroundColor: 'rgba(59, 130, 246, 0.2)'
                }]
            },
            options: commonOptions
        });

        // 3. Storage Quota (Pie)
        new Chart(document.getElementById('userStorage'), {
            type: 'pie',
            data: {
                labels: ['Used', 'Free'],
                datasets: [{
                    data: [75, 25],
                    backgroundColor: ['#6366f1', '#e5e7eb'],
                    borderWidth: 0
                }]
            },
            options: { ...commonOptions, scales: { x: { display: false }, y: { display: false } } }
        });

        // 4. Network Speed (Line)
        new Chart(document.getElementById('userSpeed'), {
            type: 'line',
            data: {
                labels: ['10am', '11am', '12pm', '1pm'],
                datasets: [{
                    label: 'Download Speed (Mbps)',
                    data: [500, 480, 520, 510],
                    borderColor: '#10b981',
                    tension: 0.4
                }]
            },
            options: commonOptions
        });

        // 5. Device Health (Radar)
        new Chart(document.getElementById('userDeviceHealth'), {
            type: 'radar',
            data: {
                labels: ['CPU', 'RAM', 'Disk', 'Network', 'Temp'],
                datasets: [{
                    label: 'Health Metric',
                    data: [90, 85, 95, 88, 92],
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: '#10b981'
                }]
            },
            options: { ...commonOptions, scales: { r: { grid: { color: '#444' } } } }
        });

        // 6. Support Response Time (Bar)
        new Chart(document.getElementById('userResponseTime'), {
            type: 'bar',
            data: {
                labels: ['Ticket 1', 'Ticket 2', 'Ticket 3'],
                datasets: [{
                    label: 'Time (mins)',
                    data: [15, 30, 10],
                    backgroundColor: '#f59e0b'
                }]
            },
            options: commonOptions
        });

        // 7. Knowledge Base Activity (Bar)
        new Chart(document.getElementById('userKbActivity'), {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Articles Read',
                    data: [5, 8, 2, 10],
                    backgroundColor: '#8b5cf6'
                }]
            },
            options: commonOptions
        });

        // 8. Security Score (Doughnut)
        new Chart(document.getElementById('userSecurityScore'), {
            type: 'doughnut',
            data: {
                labels: ['Secure', 'Risk'],
                datasets: [{
                    data: [92, 8],
                    backgroundColor: ['#10b981', '#ef4444'],
                    circumference: 180,
                    rotation: -90,
                    borderWidth: 0
                }]
            },
            options: { ...commonOptions, scales: { x: { display: false }, y: { display: false } } }
        });

        // 9. Subscription Value (Line)
        new Chart(document.getElementById('userSubValue'), {
            type: 'line',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'ROI %',
                    data: [120, 130, 145, 160],
                    borderColor: '#ec4899',
                    fill: false
                }]
            },
            options: commonOptions
        });

        // 10. Incident Types (Polar Area)
        new Chart(document.getElementById('userIncidents'), {
            type: 'polarArea',
            data: {
                labels: ['Login', 'Email', 'VPN', 'Hardware'],
                datasets: [{
                    data: [4, 2, 5, 1],
                    backgroundColor: ['#3b82f6', '#f59e0b', '#ef4444', '#10b981']
                }]
            },
            options: { ...commonOptions, scales: { x: { display: false }, y: { display: false } } }
        });

        // 11. Project Status (Bar)
        new Chart(document.getElementById('userProjectStatus'), {
            type: 'bar',
            data: {
                labels: ['Research', 'Design', 'Dev', 'Test', 'Deploy'],
                datasets: [{
                    label: 'Completion %',
                    data: [100, 90, 65, 30, 10],
                    backgroundColor: '#3b82f6'
                }]
            },
            options: commonOptions
        });

        // 12. Login Activity (Line)
        new Chart(document.getElementById('userLoginActivity'), {
            type: 'line',
            data: {
                labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                datasets: [{
                    label: 'Successful Logins',
                    data: [1, 5, 4, 6, 8, 5, 2],
                    borderColor: '#10b981',
                    stepped: true
                }]
            },
            options: commonOptions
        });

        // 13. Data Transfer (Bar)
        new Chart(document.getElementById('userDataTransfer'), {
            type: 'bar',
            data: {
                labels: ['Up', 'Down'],
                datasets: [{
                    label: 'MB',
                    data: [1200, 4500],
                    backgroundColor: ['#f59e0b', '#6366f1']
                }]
            },
            options: commonOptions
        });

        // 14. Feedback Score (Radar)
        new Chart(document.getElementById('userFeedbackScore'), {
            type: 'radar',
            data: {
                labels: ['Speed', 'Directness', 'Clarity', 'Helpfulness', 'Empathy'],
                datasets: [{
                    label: 'Rating',
                    data: [4.5, 4.0, 4.8, 5.0, 4.2],
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.2)'
                }]
            },
            options: commonOptions
        });

        // 15. App Performance (Line)
        new Chart(document.getElementById('userAppPerformance'), {
            type: 'line',
            data: {
                labels: ['App A', 'App B', 'App C', 'App D'],
                datasets: [{
                    label: 'Response Time (ms)',
                    data: [120, 80, 250, 190],
                    borderColor: '#ec4899'
                }]
            },
            options: commonOptions
        });

        // 16. Support Costs (Pie)
        new Chart(document.getElementById('userSupportCosts'), {
            type: 'pie',
            data: {
                labels: ['Base Plan', 'Extras', 'Consulting'],
                datasets: [{
                    data: [150, 45, 90],
                    backgroundColor: ['#6366f1', '#f59e0b', '#10b981']
                }]
            },
            options: commonOptions
        });

        // 17. Resolution Steps (Line)
        new Chart(document.getElementById('userResolutionSteps'), {
            type: 'line',
            data: {
                labels: ['T1', 'T2', 'T3', 'T4', 'T5'],
                datasets: [{
                    label: 'Mean Steps to Fix',
                    data: [2, 5, 3, 4, 3],
                    borderColor: '#06b6d4',
                    tension: 0.3
                }]
            },
            options: commonOptions
        });

        // 18. Certifications (Polar Area)
        new Chart(document.getElementById('userCertifications'), {
            type: 'polarArea',
            data: {
                labels: ['Security', 'Cloud', 'Networking', 'Software'],
                datasets: [{
                    data: [4, 2, 3, 5],
                    backgroundColor: ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6']
                }]
            },
            options: commonOptions
        });

        // 19. Team Interaction (Doughnut)
        new Chart(document.getElementById('userTeamInteraction'), {
            type: 'doughnut',
            data: {
                labels: ['Chat', 'Video', 'Files', 'Tasks'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']
                }]
            },
            options: commonOptions
        });

        // 20. Task Completion (Bar)
        new Chart(document.getElementById('userTaskCompletion'), {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Tasks',
                    data: [15, 22, 18, 25],
                    backgroundColor: '#8b5cf6'
                }]
            },
            options: commonOptions
        });

    }
});
