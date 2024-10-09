document.addEventListener('DOMContentLoaded', () => {
    const employeeForm = document.getElementById('employeeForm');
    const employeesBody = document.getElementById('employeesBody');
    const searchInput = document.getElementById('search');

    // Fetch and display employees
    fetchEmployees(); // Fetch employees on page load

    // Handle form submission
    employeeForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const newEmployee = {
            empno: parseInt(document.getElementById('empno').value),
            ename: document.getElementById('ename').value,
            job: document.getElementById('job').value,
            mgr: parseInt(document.getElementById('mgr').value) || null,
            hiredate: document.getElementById('hiredate').value,
            sal: parseFloat(document.getElementById('sal').value),
            comm: parseFloat(document.getElementById('comm').value) || null,
            deptno: parseInt(document.getElementById('deptno').value)
        };

        await fetch('http://localhost:3000/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEmployee)
        });

        employeeForm.reset(); // Clear the form
        fetchEmployees(); // Refresh the employee list
    });

    // Search employees
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        filterEmployees(searchTerm);
    });
});

// Function to fetch and display employees
async function fetchEmployees() {
    const response = await fetch('http://localhost:3000/employees');
    const employees = await response.json();
    displayEmployees(employees); // Pass the employees to the display function
}

// Function to display employees in the table
function displayEmployees(employees) {
    const employeesBody = document.getElementById('employeesBody');
    employeesBody.innerHTML = ''; // Clear existing rows
    console.log('Fetched employees');
    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.empno}</td>
            <td>${employee.ename}</td>
            <td>${employee.job}</td>
            <td>${employee.mgr || 'N/A'}</td>
            <td>${new Date(employee.hiredate).toLocaleDateString()}</td>
            <td>${employee.sal}</td>
            <td>${employee.comm || 'N/A'}</td>
            <td>${employee.deptno}</td>
            <td>
                <button onclick="deleteEmployee(${employee.empno})">Delete</button>
            </td>
        `;
        employeesBody.appendChild(row);
    });
}

// Function to filter employees based on search term
function filterEmployees(searchTerm) {
    const rows = document.querySelectorAll('#employeesBody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const employeeName = cells[1].textContent.toLowerCase(); // Assuming the name is in the second cell
        row.style.display = employeeName.includes(searchTerm) ? '' : 'none'; // Show or hide based on search term
    });
}

// Function to delete an employee
async function deleteEmployee(empno) {
    await fetch(`http://localhost:3000/employees/${empno}`, {
        method: 'DELETE'
    });
    fetchEmployees(); // Refresh the employee list
}
