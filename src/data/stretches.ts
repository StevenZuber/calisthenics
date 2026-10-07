/**
 * Stretch plan for the Stretch tab. Every day gets two problem-area blocks
 * (neck + shoulders, lower back + hips) and a short complement block keyed to
 * that day's workout. `stretchInfo` holds the drawer detail, keyed by the
 * exact `Exercise.name` used in the groups.
 */

import type { Exercise, ExerciseInfo } from "./plan";

export type StretchGroup = {
  title: string;
  items: Exercise[];
};

export const stretchInfo: Record<string, ExerciseInfo> = {
  // Neck + shoulders (daily)
  "Chin Tucks": {
    muscles: "Deep neck flexors; releases the suboccipitals at the base of the skull",
    how: "Sit or stand tall. Without tilting your head, glide your chin straight back as if making a double chin. Hold 2 seconds, release. You should feel a stretch at the base of the skull and the front-of-neck muscles working.",
    tips: [
      "Think 'head slides back on a shelf', not 'nod down'",
      "Great reset after phone or laptop time",
      "Keep your jaw relaxed",
    ],
  },
  "Upper Trap Stretch": {
    muscles: "Upper trapezius, side of the neck",
    how: "Sit on your hand or hold the chair edge to pin the shoulder down. Tilt your ear toward the opposite shoulder, keeping your nose pointing forward. Let the weight of your head do the work; a gentle hand on top adds a little more.",
    tips: [
      "Pinning the shoulder down is what makes it work",
      "Breathe out slowly and let the neck lengthen",
      "Never pull hard on the head",
    ],
  },
  "Levator Scapulae Stretch": {
    muscles: "Levator scapulae: the ropey muscle from the neck to the top of the shoulder blade",
    how: "Same setup as the upper trap stretch, but turn your head about 45° toward the opposite side and look down toward your armpit. A light hand on the back of the head adds a little pull. Hold, then switch.",
    tips: [
      "This is the one that eases the 'knot' at the top of the shoulder blade",
      "Keep the opposite shoulder dropped the whole time",
      "Mild stretch only; it is a small muscle",
    ],
  },
  "Doorway Pec Stretch": {
    muscles: "Pecs and front deltoids: the muscles that round the shoulders forward",
    how: "Stand in a doorway with forearms on the frame, elbows a bit below shoulder height. Step one foot through and lean your chest forward until you feel a stretch across the front of the chest and shoulders. Keep ribs down and chin tucked.",
    tips: [
      "Lower elbows target the upper chest; higher elbows the lower chest",
      "Don't let the lower back arch to find more range",
      "Pairs well with chin tucks for forward-head posture",
    ],
  },

  // Lower back + hips (daily)
  "Cat-Cow": {
    muscles: "Whole spine, especially the lumbar and thoracic segments",
    how: "On hands and knees, wrists under shoulders and knees under hips. Inhale and let the belly drop while lifting the chest and tailbone (cow). Exhale and round the whole spine toward the ceiling, tucking the chin and tailbone (cat). Move slowly with the breath.",
    tips: [
      "Gentle movement, not a stretch you force",
      "Try to move one vertebra at a time",
      "Ideal first thing in the morning when the back is stiff",
    ],
  },
  "Child's Pose": {
    muscles: "Lower back, lats, glutes",
    how: "From kneeling, sit your hips back toward your heels and walk your hands forward until your forehead rests near the floor. Let the lower back round and relax. Breathe into the back of your ribs.",
    tips: [
      "Knees wide if the hips feel pinched",
      "Walk the hands to one side to add a lat stretch",
      "A pillow under the hips or forehead makes it easier to relax",
    ],
  },
  "Figure-Four Stretch": {
    muscles: "Piriformis and glutes: the deep hip rotators that refer tension into the lower back",
    how: "Lie on your back with knees bent. Cross your right ankle over your left knee, then reach through and pull the left thigh toward your chest. Push the right knee gently away. Hold, then switch sides.",
    tips: [
      "Keep your head and shoulders down on the floor",
      "Flex the crossed foot to protect the knee",
      "Can also be done seated in a chair, leaning forward",
    ],
  },
  "Couch Stretch": {
    muscles: "Hip flexors and quads: tight ones tilt the pelvis and load the lower back",
    how: "Kneel facing away from a couch or wall. Put one shin up against it, knee at the base, and step the other foot forward into a lunge. Squeeze the glute of the back leg and lift your torso upright. The stretch runs down the front of the back hip and thigh.",
    tips: [
      "Squeeze the back glute: that is what unlocks the hip",
      "Hands on the front knee is easier; torso upright is harder",
      "Start with the knee a bit away from the wall and work closer",
    ],
  },

  // After push
  "Wrist Flexor + Extensor Stretch": {
    muscles: "Forearm flexors and extensors; eases wrist load from push-ups",
    how: "Arm straight out, palm up. Use the other hand to pull the fingers down and back (flexors). Then flip the palm down and pull the back of the hand toward you (extensors). Hold each, then switch arms.",
    tips: [
      "Do these right after push-ups while the forearms are warm",
      "Gentle rocking back and forth on all fours also counts",
      "If wrists are flaring, this is the first thing to add, not skip",
    ],
  },
  "Wall Angels": {
    muscles: "Lower traps, rotator cuff, thoracic spine: posture muscles that pressing neglects",
    how: "Stand with your back, head, and arms against a wall, elbows bent 90° like a goalpost. Keep your lower back close to the wall and slide your arms up overhead, then back down, without the wrists or elbows leaving the wall.",
    tips: [
      "Slow. Quality of contact matters more than reach",
      "If the arms can't stay on the wall, shorten the range",
      "This is strength work for your posture, not just a stretch",
    ],
  },
  "Triceps Overhead Stretch": {
    muscles: "Triceps and lats, worked hard by dips and pike push-ups",
    how: "Raise one arm overhead and bend the elbow so the hand drops behind your neck. Use the other hand to gently press the elbow back and down. Keep ribs down and avoid arching the lower back. Switch sides.",
    tips: [
      "Lean slightly to the opposite side to add the lat",
      "Keep the neck long; don't shrug into it",
    ],
  },

  // After pull
  "Lat Stretch": {
    muscles: "Lats and teres major; tight lats pull the shoulders forward and arch the lower back",
    how: "Hold the pull-up bar or a doorframe with one hand and sit your hips back and away, letting your arm straighten. Side-bend slightly away from the hand so the stretch runs from the armpit down the side of the ribs. Switch sides.",
    tips: [
      "A dead hang from the bar stretches both at once",
      "Exhale fully to let the ribs drop",
      "Great after pull-ups while the lats are pumped",
    ],
  },
  "Forearm Extensor Stretch": {
    muscles: "Forearm extensors and grip muscles, loaded by hanging and rows",
    how: "Arm straight out, palm down, fingers pointing to the floor. Use the other hand to pull the back of the hand toward you until you feel it along the top of the forearm. Hold, then switch.",
    tips: [
      "Make a loose fist for a stronger stretch",
      "Grip is often the limiter on pull-ups; keeping forearms loose helps",
    ],
  },
  "Thread the Needle": {
    muscles: "Thoracic rotation, rear shoulders, upper back",
    how: "On hands and knees, slide one arm palm-up under your chest until the shoulder and ear rest on the floor. Pause, then reverse and sweep the arm up toward the ceiling, opening the chest. Repeat, then switch sides.",
    tips: [
      "Let the hips stay stacked over the knees",
      "Follow the hand with your eyes to encourage neck rotation",
      "Rotation is what the upper back is missing after a day at a desk",
    ],
  },

  // After core, and rest days
  "Thoracic Extension": {
    muscles: "Thoracic spine (upper back); counters the rounding from hollow body and desk posture",
    how: "Lie back over a rolled towel or foam roller placed across your upper back, hands behind your head to support the neck. Let the upper back drape over it and breathe. Shift the roller up or down a segment and repeat.",
    tips: [
      "Keep the ribs down; extend from the upper back, not the lower back",
      "Nod the chin slightly so the neck doesn't crane",
    ],
  },
  "Hamstring Stretch": {
    muscles: "Hamstrings; tight ones tuck the pelvis and round the lower back",
    how: "Lie on your back and loop a towel or strap around one foot. Keep the other leg flat on the floor and raise the strapped leg toward the ceiling, knee nearly straight, until you feel the back of the thigh. Hold, then switch.",
    tips: [
      "Keep the lower back on the floor; this isolates the hamstring",
      "A slight knee bend is fine if the knee wants to lock",
      "Flex the foot to add the calf",
    ],
  },
  "Prone Press-up": {
    muscles: "Lower back extension; a gentle counter to a day of flexion work",
    how: "Lie face down, hands under the shoulders. Keeping hips on the floor and the lower back relaxed, press the chest up as far as is comfortable, then lower slowly. Repeat.",
    tips: [
      "Let the back muscles stay soft; the arms do the lifting",
      "Stop at the range that feels easy; a few degrees more each rep is plenty",
      "Skip this one if it produces pain that spreads down the leg",
    ],
  },
};

const neckShoulders: StretchGroup = {
  title: "Neck + Shoulders",
  items: [
    { name: "Chin Tucks", detail: "2 × 10 reps", note: "Hold 2 sec each" },
    { name: "Upper Trap Stretch", detail: "30 sec each side", note: "Pin the shoulder down" },
    { name: "Levator Scapulae Stretch", detail: "30 sec each side", note: "Nose to armpit" },
    { name: "Doorway Pec Stretch", detail: "2 × 30 sec", note: "Ribs down, chin tucked" },
  ],
};

const lowerBackHips: StretchGroup = {
  title: "Lower Back + Hips",
  items: [
    { name: "Cat-Cow", detail: "10 slow reps", note: "Move with the breath" },
    { name: "Child's Pose", detail: "45 sec", note: "Let the back round" },
    { name: "Figure-Four Stretch", detail: "30 sec each side", note: "" },
    { name: "Couch Stretch", detail: "45 sec each side", note: "Squeeze the back glute" },
  ],
};

const afterPush: StretchGroup = {
  title: "After Push",
  items: [
    { name: "Wrist Flexor + Extensor Stretch", detail: "30 sec each", note: "While forearms are warm" },
    { name: "Wall Angels", detail: "2 × 8 reps", note: "Slow, stay on the wall" },
    { name: "Triceps Overhead Stretch", detail: "30 sec each side", note: "" },
  ],
};

const afterPull: StretchGroup = {
  title: "After Pull",
  items: [
    { name: "Lat Stretch", detail: "30 sec each side", note: "Bar or doorframe" },
    { name: "Forearm Extensor Stretch", detail: "30 sec each side", note: "" },
    { name: "Thread the Needle", detail: "8 each side", note: "" },
  ],
};

const afterCore: StretchGroup = {
  title: "After Core",
  items: [
    { name: "Prone Press-up", detail: "8 slow reps", note: "Easy range only" },
    { name: "Thoracic Extension", detail: "45 sec", note: "Rolled towel or roller" },
    { name: "Hamstring Stretch", detail: "30 sec each side", note: "" },
  ],
};

const restDay: StretchGroup = {
  title: "Rest Day",
  items: [
    { name: "Thoracic Extension", detail: "45 sec", note: "Rolled towel or roller" },
    { name: "Hamstring Stretch", detail: "30 sec each side", note: "Take your time" },
  ],
};

/** Complement block per day, Monday-first, mirroring `days` in plan.ts. */
const complements: StretchGroup[] = [
  afterPush, // Mon
  afterPull, // Tue
  afterCore, // Wed
  afterPush, // Thu
  afterPull, // Fri
  restDay, // Sat
  restDay, // Sun
];

/**
 * Stretch groups for a day: the two daily problem-area blocks first, then the
 * block that complements that day's workout.
 *
 * @param dayIndex - 0–6, Monday-first
 * @returns        Ordered groups to render
 */
export function stretchesFor(dayIndex: number): StretchGroup[] {
  return [neckShoulders, lowerBackHips, complements[dayIndex]];
}
