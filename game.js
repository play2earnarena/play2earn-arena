const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 160;

let points = 0;
const REWARD_TARGET = 1000000; // example reward target

const rewardFill = document.getElementById("rewardFill");
const pointsText = document.getElementById("pointsText");
const progressText = document.getElementById("progressText");
