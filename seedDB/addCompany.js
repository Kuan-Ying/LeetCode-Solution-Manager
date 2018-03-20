const LeetProblem = require('../models/leetproblem')

const fbProbs = [621, 283, 301, 273, 67, 253, 325, 17, 314, 91, 689, 15, 297, 158, 10, 311, 278, 200, 277, 76, 543, 257, 121, 23, 282, 173, 157, 125, 211, 56, 1, 680, 636, 341, 252, 597, 161, 43, 98, 602, 78, 133, 285, 57, 215, 139, 238, 670, 75, 88, 33, 13, 146, 206, 79, 494, 642, 236, 523, 286, 49, 38, 20, 721, 477, 218, 208, 102, 209, 398, 554, 674, 71, 128, 28, 44, 90, 127, 647, 380, 269, 639, 377, 714, 334, 235, 117, 69, 461, 50, 410, 85, 26, 68, 210, 221, 274, 234, 404, 25, 80, 168, 637, 572, 653, 265, 535, 578, 673, 525, 261, 750, 275, 745, 764]
const googProbs= [388, 683, 681, 340, 482, 308, 346, 686, 298, 418, 281, 425, 361, 394, 393, 163, 753, 66, 568, 351, 271, 687, 616, 317, 289, 737, 288, 305, 399, 280, 259, 200, 734, 159, 218, 345, 329, 279, 406, 56, 417, 246, 249, 284, 766, 228, 524, 407, 247, 297, 276, 42, 294, 286, 146, 391, 471, 463, 362, 360, 295, 401, 24, 380, 320, 505, 266, 274, 315, 341, 253, 769, 484, 544, 490, 162, 411, 774, 389, 20, 139, 269, 239, 359, 158, 128, 465, 230, 293, 415, 498, 23, 270, 318, 400, 369, 240, 4, 777, 10, 332, 358, 212, 166, 173, 54, 155, 17, 373, 140, 324, 224, 543, 353, 422, 251, 22, 31, 729, 727, 552, 587, 57, 503, 44, 409, 363, 208, 336, 684, 327, 133, 460, 50, 421, 562, 375, 231, 444, 676, 760, 261, 309, 604, 379, 354, 459, 214, 348, 382, 402, 370, 408, 501, 1, 272, 652, 475, 377, 551, 302, 282, 530, 447, 480, 658, 378, 387, 356, 474, 321, 397, 486, 368, 313, 331, 323, 310, 448, 451, 374, 326, 257, 330, 643, 644, 651, 545, 312, 656, 657, 314, 316, 659, 581, 665, 541, 667, 668, 535, 533, 685, 569, 689, 719, 531, 726, 583, 527, 526, 522, 521, 357, 520, 731, 732, 739, 514, 747, 506, 748, 560, 756, 758, 494, 493, 487, 778, 485, 765, 483, 768, 481, 469, 549, 638, 779]
const Google = {name: 'Google', problems: googProbs}
const Facebook = {name: 'Facebook', problems: fbProbs}
const COMPANYs = [Google, Facebook]

async function addCompany() {
  for (let COMPANY of COMPANYs) {
    let freq = COMPANY.problems.length
    for (let problemId of COMPANY.problems) {
        let problem = await LeetProblem.findOne({id: problemId})
        if (!problem) continue
        if (problem.tags.includes(COMPANY.name)) return console.log(problemId + " has already have tag "+ COMPANY.name)
        problem.tags.push(COMPANY.name)
        problem.companies[COMPANY.name] = {"frequency":freq--}
        problem.markModified('companies')
        problem.markModified('tags')
        console.log("tag added to "+problemId)
        await problem.save()
        await LeetProblem.findByIdAndUpdate(problem._id, problem)
    }
  }
}

module.exports = addCompany