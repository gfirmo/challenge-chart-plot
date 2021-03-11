document.addEventListener("DOMContentLoaded", ()=> {
	runDraw();
});

let graph = undefined;
let gp5 = undefined
function buildGraph() {
	graph = new basicGraph(input.message)
	graph.parseData()
	gP5.redraw();
}

function runDraw() {
	var element = document.getElementById("graphDraw");
	
	gP5 = new p5((p) =>{
		var gH = p.select('#graphDraw').height
		var gW = p.select('#graphDraw').width
		p.setup = ()=> {
			p.createCanvas(gW, gH);
			p.colorMode(p.HSL);
		}
		p.draw = ()=> {
			p.background(360, 0, 100);
			gH = p.select('#graphDraw').height
			gW = p.select('#graphDraw').width
			if (graph != undefined) {
				graph.draw(p, gH, gW);
			}
		}
	}
	, element)
}

class basicGraph {
	constructor(string) {
		this.sourceString = string;
		this.listOfEvents = [];
		this.listGroups = [];
		this.listSelect = [];
		this.plots = {};
		this.span = [];
		this.colors = {};
	}
	
	parseData() {
		let eventList = this.sourceString.split('\n');
		eventList.forEach(function(currEvent){
			let clean = currEvent;
			clean = clean.replaceAll(" ", "");
			clean = clean.replaceAll('"', "");
			clean = clean.replaceAll('{', "");
			clean = clean.replaceAll('}', "");
			clean = clean.replaceAll('[', "");
			clean = clean.replaceAll(']', "");
			let parse = clean.split(new RegExp(",|:"));
			var eDict = {}
			var i = 0;
			while (i < parse.length) {
				if (parse[i] == "select"){
					var selection = []
					i += 1;
					while (parse[i] != "group") {
						selection.push(parse[i]);
						i += 1;
					}
					eDict["select"] = selection;
				} else if (parse[i] == "group"){
					var sOs = [];
					i += 1;
					while (i < parse.length) {
						sOs.push(parse[i]);
						i += 1;
					}
					eDict["group"] = sOs;
				} else {
					eDict[parse[i]] = parse[i + 1];
					i += 2;
				}
			}
			this.listOfEvents.push(eDict);
		}, this);
		
		
		this.listOfEvents.forEach(function(e) {
			if (e["type"] == "start") {
				this.listGroups = e["group"];
				this.listSelect = e["select"];
			} else if (e["type"] == "span") {
				this.span = [e["begin"], e["end"]];
			} else if (e["type"] == "data") {
				//group prep
				var descStr = ""
				this.listGroups.forEach(function(group) {
					descStr += e[group] + " "
				}, this)
				//select prep
				this.listSelect.forEach(function(s) {
					if (this.plots[descStr + s] != undefined)
						for (var point of this.plots[descStr + s]) {
							if (point.getX() == e["timestamp"]) {
								point[this.plots[descStr + s].indexOf(point)] = new GPoint(parseFloat(e["timestamp"]), parseFloat(e[s]));
							} else {
								this.plots[descStr + s].push(new GPoint(parseFloat(e["timestamp"]), parseFloat(e[s])));
							}
						}
					else {
						this.plots[descStr +s] = [new GPoint(parseFloat(e["timestamp"]), parseFloat(e[s]))];
					}
				}, this)
			}
		}, this);
	}

	draw(p, height, width) {
		var nGraph = new GPlot(p);
		nGraph.setPos(0, 0);
		nGraph.setDim(width * 0.5, height* 0.65);
		var keys = [];
		var xPos = [];
		var yPos = [];
		var currY = 0.9
		for (var key of Object.keys(this.plots)) {
			var inSpan = [];
			for (var point of this.plots[key]) {
				if (point.getX() >= this.span[0] && point.getX() <= this.span[1]){
					inSpan.push(point);
				}
			}
			nGraph.addLayer(key, inSpan);
			if (this.colors[key] == undefined) {
				this.colors[key] = [Math.random() * 360, 100, 50];
			}
			nGraph.getLayer(key).setLineColor(p.color(this.colors[key][0],this.colors[key][1], this.colors[key][2]));
			keys.push(key);
			xPos.push(0.95);
			yPos.push(currY);
			currY += -0.1;
		}
		nGraph.beginDraw();  
		nGraph.drawBackground();
		nGraph.drawBox();
		nGraph.drawXAxis();
		nGraph.drawYAxis();
        nGraph.drawLines();
		nGraph.drawLegend(keys, xPos, yPos);
		nGraph.endDraw();
	}
}