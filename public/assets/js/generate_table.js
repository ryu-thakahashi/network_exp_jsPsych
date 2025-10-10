const NEIGHBOR_NUM = 4;
const BC_RATIO = 6;

function addTableHeader(pos) {
	const thead = document.createElement(pos);
	const headerRow = document.createElement("tr");
	const headerContents = ["", "あなたとつながりのある 4 人のうち"];

	headerContents.forEach((content) => {
		const th = document.createElement("th");
		th.innerHTML = content;
		if (content === "あなたとつながりのある 4 人のうち") {
			th.colSpan = 5;
		}
		headerRow.appendChild(th);
	});

	thead.appendChild(headerRow);
	return thead;
}

function addBehavHeadTr(behavior) {
	const tr = document.createElement("tr");
	tr.classList.add("behav-head");

	const behav_dict = {
		cooperate: "A",
		defect: "B",
	};
	let td_contents = [];
	for (let i = 0; i <= NEIGHBOR_NUM; i++) {
		const td_text =
			`${i} 人が <strong class="${behavior}">${behav_dict[behavior]}</strong> を選択<br>` +
			`${NEIGHBOR_NUM - i} 人が <strong class="${
				behavior === "cooperate" ? "defect" : "cooperate"
			}">${
				behav_dict[behavior === "cooperate" ? "defect" : "cooperate"]
			}</strong> を選択`;

		td_contents.push(td_text);
	}
	if (behavior === "defect") {
		td_contents.reverse();
	}
	td_contents.unshift("");

	let behav_count = -1;
	td_contents.forEach((content) => {
		const td = document.createElement("td");
		td.innerHTML = content;
		td.id = `other-${behav_count}-${behavior}-td`;
		tr.appendChild(td);

		behav_count++;
	});

	return tr;
}

function addPayoffTr(behavior) {
	const tr = document.createElement("tr");
	tr.id = `participants-${behavior}-tr`;

	const contents_dict = {
		cooperate: [
			'あなたが <strong class="cooperate">A</strong> を選んだ場合',
			0,
			BC_RATIO * 1,
			BC_RATIO * 2,
			BC_RATIO * 3,
			BC_RATIO * 4,
		],
		defect: [
			'あなたが <strong class="defect">B</strong> を選んだ場合',
			BC_RATIO * 0 + NEIGHBOR_NUM,
			BC_RATIO * 1 + NEIGHBOR_NUM,
			BC_RATIO * 2 + NEIGHBOR_NUM,
			BC_RATIO * 3 + NEIGHBOR_NUM,
			BC_RATIO * 4 + NEIGHBOR_NUM,
		],
	};

	for (let i = 0; i <= NEIGHBOR_NUM + 1; i++) {
		const td_text = contents_dict[behavior][i];
		const td = document.createElement("td");
		td.innerHTML = td_text;
		td.id = `points-${behavior}-${i - 1}-td`;
		if (td.id.includes("--1-td")) {
			td.style.fontWeight = "bold";
		}
		tr.appendChild(td);
	}

	return tr;
}

function createTable() {
	// console.log("createTable called");
	const new_payoff_table = document.createElement("table");
	new_payoff_table.classList.add("table", "table-bordered");
	new_payoff_table.appendChild(addTableHeader("thead"));

	const tbody = document.createElement("tbody");
	tbody.appendChild(addBehavHeadTr("cooperate"));
	tbody.appendChild(addPayoffTr("cooperate"));
	tbody.appendChild(addPayoffTr("defect"));
	new_payoff_table.appendChild(tbody);
	// console.log(new_payoff_table);

	const payoff_table = document.getElementById("payoff-table");
	// console.log(payoff_table);
	payoff_table.appendChild(new_payoff_table);
}

export { createTable };
