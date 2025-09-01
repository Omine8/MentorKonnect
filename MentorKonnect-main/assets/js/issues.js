
export function renderMenteeIssuesPage(content) {
    const menteeId = localStorage.getItem("menteeId");
    const mentorId = localStorage.getItem("mentorId");

    content.innerHTML = `
        <h2>My Issues</h2>
        <div id="issueError" style="color:red; margin:5px 0;"></div>
        <ul id="menteeIssuesList">Loading...</ul>

        <h3>Create New Issue</h3>
        <form id="create-issue-form">
            <label>Title: <input type="text" id="issueTitle" required></label><br>
            <label>Type:
                <select id="issueType" required>
                    <option value="COMPLAINT">Complaint</option>
                    <option value="PROBLEM">Problem</option>
                </select>
            </label><br>
            <label>Description:<br><textarea id="issueDesc" required></textarea></label><br>
            <button type="submit">Submit Issue</button>
        </form>
    `;

    const list = content.querySelector("#menteeIssuesList");
    const errorDiv = content.querySelector("#issueError");

    async function fetchIssues() {
        try {
            const res = await fetch(`http://localhost:8080/api/issues/mentee/${menteeId}`);
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            const data = await res.json();

            if (!data.length) {
                list.innerHTML = `<li>No issues created.</li>`;
            } else {
                list.innerHTML = data.map(issue => `
                    <li>
                        <b>${issue.title}</b> (${issue.type}) - <i>${issue.status}</i>
                        <button class="view-btn" data-id="${issue.id}">View</button>
                    </li>
                `).join("");
            }

            list.querySelectorAll(".view-btn").forEach(btn => {
                btn.addEventListener("click", () => openIssueDetail(btn.dataset.id));
            });
        } catch (err) {
            list.innerHTML = `<li>Error loading issues</li>`;
            errorDiv.textContent = `❌ ${err.message}`;
        }
    }

    async function openIssueDetail(issueId) {
        try {
            const res = await fetch(`http://localhost:8080/api/issues/${issueId}`);
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            const issue = await res.json();

            content.innerHTML = `
                <button id="backBtn">⬅ Back</button>
                <h2>${issue.title}</h2>
                <p><b>Type:</b> ${issue.type}</p>
                <p><b>Status:</b> ${issue.status}</p>
                <p><b>Description:</b><br>${issue.description}</p>
            `;
            content.querySelector("#backBtn").addEventListener("click", () => renderMenteeIssuesPage(content));
        } catch (err) {
            alert("❌ Failed to load issue details: " + err.message);
        }
    }

    content.querySelector("#create-issue-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = content.querySelector("#issueTitle").value;
        const type = content.querySelector("#issueType").value;
        const description = content.querySelector("#issueDesc").value;

        try {
            const res = await fetch(`http://localhost:8080/api/issues/create/${menteeId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, issueType: type, description, mentorId: parseInt(mentorId) })
            });

            if (!res.ok) {
                let msg = `Server returned ${res.status}`;
                try {
                    const errData = await res.json();
                    msg = errData.message || msg;
                } catch { }
                throw new Error(msg);
            }

            e.target.reset();
            errorDiv.style.color = "green";
            errorDiv.textContent = "✅ Issue created successfully!";
            fetchIssues();
        } catch (err) {
            errorDiv.style.color = "red";
            errorDiv.textContent = `❌ Failed to create issue: ${err.message}`;
        }
    });

    fetchIssues();
}


export function renderMentorIssuesPage(content) {
    const mentorId = localStorage.getItem("mentorId");

    content.innerHTML = `
        <h2>Mentees' Issues</h2>
        <div id="mentorIssueError" style="color:red; margin:5px 0;"></div>
        <ul id="mentorIssuesList">Loading...</ul>
    `;

    const list = content.querySelector("#mentorIssuesList");
    const errorDiv = content.querySelector("#mentorIssueError");

    async function fetchIssues() {
        try {
            const res = await fetch(`http://localhost:8080/api/issues/mentor/${mentorId}`);
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            const data = await res.json();

            if (!data.length) {
                list.innerHTML = `<li>No issues found.</li>`;
            } else {
                list.innerHTML = data.map(issue => `
                    <li>
                        <b>${issue.title}</b> (${issue.type}) by Mentee ${issue.menteeId}
                        - <i>${issue.status}</i>
                        <button class="view-btn" data-id="${issue.id}">View</button>
                    </li>
                `).join("");
            }

            list.querySelectorAll(".view-btn").forEach(btn => {
                btn.addEventListener("click", () => openIssueDetail(btn.dataset.id));
            });
        } catch (err) {
            list.innerHTML = `<li>Error loading issues</li>`;
            errorDiv.textContent = `❌ ${err.message}`;
        }
    }

    async function openIssueDetail(issueId) {
        try {
            const res = await fetch(`http://localhost:8080/api/issues/${issueId}`);
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            const issue = await res.json();

            content.innerHTML = `
                <button id="backBtn">⬅ Back</button>
                <h2>${issue.title}</h2>
                <p><b>Type:</b> ${issue.type}</p>
                <p><b>Status:</b> ${issue.status}</p>
                <p><b>Description:</b><br>${issue.description}</p>
                <button id="progressBtn">Mark In Progress</button>
                <button id="resolveBtn">Mark Resolved</button>
                <div id="updateError" style="color:red; margin-top:10px;"></div>
            `;

            const updateError = content.querySelector("#updateError");

            content.querySelector("#backBtn").addEventListener("click", () => renderMentorIssuesPage(content));
            content.querySelector("#progressBtn").addEventListener("click", () => updateStatus(issueId, "IN_PROGRESS", updateError));
            content.querySelector("#resolveBtn").addEventListener("click", () => updateStatus(issueId, "RESOLVED", updateError));
        } catch (err) {
            alert("❌ Failed to load issue details: " + err.message);
        }
    }

    async function updateStatus(issueId, status, updateError) {
        try {
            const res = await fetch(`http://localhost:8080/api/issues/${issueId}/status?status=${status}`, {
                method: "PUT"
            });

            if (!res.ok) {
                let msg = `Server returned ${res.status}`;
                try {
                    const errData = await res.json();
                    msg = errData.message || msg;
                } catch { }
                throw new Error(msg);
            }

            alert(`✅ Issue marked as ${status}`);
            renderMentorIssuesPage(content);
        } catch (err) {
            updateError.textContent = `❌ Failed to update status: ${err.message}`;
        }
    }


    fetchIssues();
}
