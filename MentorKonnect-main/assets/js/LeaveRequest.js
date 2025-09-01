export function renderMenteeLeavePage(content) {
    const menteeId = localStorage.getItem("menteeId");
    const mentorId = localStorage.getItem("mentorId");

    content.innerHTML = `
        <h2>My Leave Requests</h2>
        <div id="leaveError" style="color:red; margin:5px 0;"></div>
        <table border="1" id="mentee-requests-table">
            <thead>
                <tr>
                    <th>ID</th><th>Start Date</th><th>End Date</th>
                    <th>Reason</th><th>Status</th><th>Mentor ID</th><th>Mentee ID</th>
                </tr>
            </thead>
            <tbody id="menteeRequestsBody">
                <tr><td colspan="7">Loading...</td></tr>
            </tbody>
        </table>
        <h3>Create New Leave Request</h3>
        <form id="create-leave-form">
            <label>Mentee ID: <input type="text" id="menteeId" value="${menteeId}" readonly></label><br>
            <label>Mentor ID: <input type="text" id="mentorId" value="${mentorId}" readonly></label><br>
            <label>Start Date: <input type="date" id="startDate" required></label><br>
            <label>End Date: <input type="date" id="endDate" required></label><br>
            <label>Reason: <input type="text" id="reason" required></label><br>
            <button type="submit">Submit Request</button>
        </form>
        <div id="leaveStatus" style="margin:10px 0; color:blue;"></div>
    `;

    const tableBody = content.querySelector("#menteeRequestsBody");
    const statusDiv = content.querySelector("#leaveStatus");
    const errorDiv = content.querySelector("#leaveError");

    async function fetchRequests() {
        try {
            errorDiv.textContent = '';
            const res = await fetch(`http://localhost:8080/api/leave-requests/mentee/${menteeId}`);
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            const data = await res.json();
            if (!data.length) {
                tableBody.innerHTML = `<tr><td colspan="7">No leave requests found.</td></tr>`;
            } else {
                tableBody.innerHTML = data.map(r => `
                    <tr>
                        <td>${r.id}</td>
                        <td>${r.startDate}</td>
                        <td>${r.endDate}</td>
                        <td>${r.reason}</td>
                        <td>${r.status}</td>
                        <td>${r.mentorId}</td>
                        <td>${r.menteeId}</td>
                    </tr>
                `).join("");
            }
        } catch (err) {
            tableBody.innerHTML = `<tr><td colspan="7">Error loading requests.</td></tr>`;
            errorDiv.textContent = `❌ ${err.message}`;
            statusDiv.textContent = '';
        }
    }

    fetchRequests();

    content.querySelector("#create-leave-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const startDate = content.querySelector("#startDate").value;
        const endDate = content.querySelector("#endDate").value;
        const reason = content.querySelector("#reason").value;

        if (!startDate || !endDate || !reason) {
            errorDiv.textContent = "❌ All fields are required!";
            return;
        }

        try {
            errorDiv.textContent = '';
            await fetch("http://localhost:8080/api/leave-requests/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    menteeId: parseInt(menteeId),
                    mentorId: parseInt(mentorId),
                    startDate,
                    endDate,
                    reason
                })
            });
            fetchRequests();
            e.target.reset();
            content.querySelector("#menteeId").value = menteeId;
            content.querySelector("#mentorId").value = mentorId;
        } catch (err) {
            errorDiv.textContent = `❌ Failed to create request: ${err.message}`;
        }
    });
}

export function renderMentorLeavePage(content) {
    const mentorId = localStorage.getItem("mentorId");

    content.innerHTML = `
        <h2>Assigned Mentees Leave Requests</h2>
        <div id="mentorError" style="color:red; margin:5px 0;"></div>
        <table border="1" id="mentor-requests-table">
            <thead>
                <tr>
                    <th>ID</th><th>Mentee ID</th><th>Start Date</th>
                    <th>End Date</th><th>Reason</th><th>Status</th><th>Actions</th>
                </tr>
            </thead>
            <tbody id="mentorRequestsBody">
                <tr><td colspan="7">Loading...</td></tr>
            </tbody>
        </table>
        <div id="mentorStatus" style="margin:10px 0; color:blue;"></div>
    `;

    const tableBody = content.querySelector("#mentorRequestsBody");
    const statusDiv = content.querySelector("#mentorStatus");
    const errorDiv = content.querySelector("#mentorError");

    async function fetchRequests() {
        try {
            errorDiv.textContent = '';
            statusDiv.textContent = "⏳ Fetching mentees' leave requests...";
            const res = await fetch(`http://localhost:8080/api/leave-requests/mentor/${mentorId}`);
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            const data = await res.json();
            if (!data.length) {
                tableBody.innerHTML = `<tr><td colspan="7">No requests found.</td></tr>`;
            } else {
                tableBody.innerHTML = "";
                data.forEach(req => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${req.id}</td>
                        <td>${req.menteeId}</td>
                        <td>${req.startDate}</td>
                        <td>${req.endDate}</td>
                        <td>${req.reason}</td>
                        <td class="status-cell">${req.status}</td>
                        <td>
                            <button class="approve-btn">Approve</button>
                            <button class="reject-btn">Reject</button>
                            <button class="cancel-btn">Cancel</button>
                        </td>
                    `;
                    tr.querySelector(".approve-btn").addEventListener("click", () => updateStatus(req.id, "APPROVED", tr));
                    tr.querySelector(".reject-btn").addEventListener("click", () => updateStatus(req.id, "REJECTED", tr));
                    tr.querySelector(".cancel-btn").addEventListener("click", () => updateStatus(req.id, "CANCELLED", tr));
                    tableBody.appendChild(tr);
                });
            }
            statusDiv.textContent = `✅ Fetched ${data.length} request(s)`;
        } catch (err) {
            tableBody.innerHTML = `<tr><td colspan="7">Error loading requests.</td></tr>`;
            errorDiv.textContent = `❌ ${err.message}`;
            statusDiv.textContent = '';
        }
    }

    async function updateStatus(id, status, tr) {
        try {
            errorDiv.textContent = '';
            await fetch(`http://localhost:8080/api/leave-requests/${id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status })
            });
            tr.querySelector(".status-cell").innerText = status;
        } catch (err) {
            errorDiv.textContent = `❌ Failed to update status: ${err.message}`;
        }
    }

    fetchRequests();
}
