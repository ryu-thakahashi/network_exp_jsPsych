// console.log("plot_network.js loaded");

const node_positions = {
	participants: { x: "50%", y: "70%" },
	neighbor_1: { x: "10%", y: "20%" },
	neighbor_2: { x: "20%", y: "60%" },
	neighbor_3: { x: "80%", y: "60%" },
	neighbor_4: { x: "90%", y: "20%" },
};
const node_color = {
	base_node_color: "gray",
	cooperate: "#198754",
	defect: "#ffc107",
};
const text_color = {
	base_text_color: "white",
	cooperate: "white",
	defect: "black",
};

function drawLinks() {
	// console.log("drawLinks called!");
	const link_objects = {
		participantToNei1: {
			x1: node_positions.participants.x,
			y1: node_positions.participants.y,
			x2: node_positions.neighbor_1.x,
			y2: node_positions.neighbor_1.y,
		},
		participantToNei2: {
			x1: node_positions.participants.x,
			y1: node_positions.participants.y,
			x2: node_positions.neighbor_2.x,
			y2: node_positions.neighbor_2.y,
		},
		participantToNei3: {
			x1: node_positions.participants.x,
			y1: node_positions.participants.y,
			x2: node_positions.neighbor_3.x,
			y2: node_positions.neighbor_3.y,
		},
		participantToNei4: {
			x1: node_positions.participants.x,
			y1: node_positions.participants.y,
			x2: node_positions.neighbor_4.x,
			y2: node_positions.neighbor_4.y,
		},
	};
	for (const link in link_objects) {
		const link_object = link_objects[link];
		const current_link = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"line"
		);
		current_link.setAttribute("x1", link_object.x1);
		current_link.setAttribute("y1", link_object.y1);
		current_link.setAttribute("x2", link_object.x2);
		current_link.setAttribute("y2", link_object.y2);
		current_link.setAttribute("stroke", "black");
		current_link.setAttribute("stroke-width", 5);

		const network_svg = document.getElementById("network-plot");
		network_svg.appendChild(current_link);
	}
}

function drawBaseNodes() {
	// console.log("drawBaseNodes called!");
	const node_num = Object.keys(node_positions).length;
	for (let i = 0; i < node_num; i++) {
		const node = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle"
		);
		const target_node_id = Object.keys(node_positions)[i];
		const pos_x = node_positions[target_node_id].x;
		const pos_y = node_positions[target_node_id].y;

		node.setAttribute("cx", pos_x);
		node.setAttribute("cy", pos_y);
		node.setAttribute("r", 40);
		node.setAttribute("fill", "gray");
		if (i === 0) {
			node.setAttribute("id", "participants-node");
		} else {
			node.setAttribute("id", "neighbor-" + i + "-node");
		}

		const network_svg = document.getElementById("network-plot");
		network_svg.appendChild(node);
	}
}

function addBaseText() {
	// console.log("addBaseText called!");
	const node_num = Object.keys(node_positions).length;
	for (let i = 0; i < node_num; i++) {
		const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

		const target_node_id = Object.keys(node_positions)[i];
		const pos_x = node_positions[target_node_id].x;
		const pos_y = node_positions[target_node_id].y;
		text.setAttribute("x", pos_x);
		text.setAttribute("y", pos_y);
		text.setAttribute("class", "network-text");
		text.setAttribute("alignment-baseline", "middle");

		// これを追加👇
		text.setAttribute("text-anchor", "middle"); // 水平中央揃え
		text.setAttribute("dominant-baseline", "middle"); // 垂直中央揃え

		if (i === 0) {
			text.setAttribute("id", "participants-text");
		} else {
			text.setAttribute("id", "neighbor-" + i + "-text");
		}
		text.textContent = "？";

		const network_svg = document.getElementById("network-plot");
		network_svg.appendChild(text);
	}

	const YOU_text = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"text"
	);
	YOU_text.setAttribute("x", "50%");
	YOU_text.setAttribute("y", "95%");
	YOU_text.setAttribute("id", "YOU-text");
	YOU_text.setAttribute("font-size", "30px");
	YOU_text.setAttribute("fill", "black");
	YOU_text.setAttribute("font-weight", "bold");
	YOU_text.setAttribute("text-anchor", "middle");
	YOU_text.textContent = "あなた";

	const network_svg = document.getElementById("network-plot");
	network_svg.appendChild(YOU_text);
}
function drawBaseNetwork() {
	drawLinks();
	drawBaseNodes();
	addBaseText();
}

function resetNetworkState() {
	const participants_node = document.getElementById("participants-node");
	participants_node.setAttribute("fill", node_color.base_node_color);

	const participants_text = document.getElementById("participants-text");
	participants_text.textContent = "？";

	const neighbor_num = 4;
	for (let i = 1; i <= neighbor_num; i++) {
		const neighbor_node = document.getElementById("neighbor-" + i + "-node");
		neighbor_node.setAttribute("fill", node_color.base_node_color);

		const neighbor_text = document.getElementById("neighbor-" + i + "-text");
		neighbor_text.textContent = "？";
	}
}

function updateParticipantsState(behave) {
	const participants_node = document.getElementById("participants-node");
	participants_node.style.fill = node_color[behave];

	const participants_text = document.getElementById("participants-text");
	participants_text.style.fill = text_color[behave];
}

function updateParticipantsPayoff(payoff) {
	const participants_text = document.getElementById("participants-text");
	participants_text.textContent = payoff;
}

function updateNeighborBehavior(neighbor_behave_list) {
	let node_num;
	try {
		node_num = neighbor_behave_list.length;
	} catch (e) {
		console.log("neighbor_behave_list is not an array");
		return;
	}

	for (let i = 1; i <= node_num; i++) {
		const neighbor_node = document.getElementById("neighbor-" + i + "-node");
		const neighbor_text = document.getElementById("neighbor-" + i + "-text");

		switch (neighbor_behave_list[i - 1]) {
			case "cooperate":
				neighbor_node.setAttribute("fill", node_color.cooperate);
				neighbor_text.style.fill = text_color.cooperate;
				break;
			case "defect":
				neighbor_node.setAttribute("fill", node_color.defect);
				neighbor_text.style.fill = text_color.defect;
				break;
			default:
				console.log("invalid behavior");
				break;
		}
	}
}

function updateNeighborPayoff(neighbor_payoff_list) {
	let node_num;
	try {
		node_num = neighbor_payoff_list.length;
	} catch (e) {
		console.log("neighbor_payoff_list is not an array");
		return;
	}

	for (let i = 1; i <= node_num; i++) {
		// console.log(i);
		const neighbor_text = document.getElementById("neighbor-" + i + "-text");
		neighbor_text.textContent = neighbor_payoff_list[i - 1];
	}
}

export {
	drawBaseNetwork,
	resetNetworkState,
	updateParticipantsState,
	updateParticipantsPayoff,
	updateNeighborBehavior,
	updateNeighborPayoff,
};
