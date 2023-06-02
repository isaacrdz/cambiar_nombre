const colors = {
  sold: {
    color: "#e53935",
  },
  documentation: {
    color: "#ffb300",
  },
  visit_rejected: {
    color: "#ef5350",
  },
  visit_followup: {
    color: "#b2ff59",
  },
  visit: {
    color: "#00acc1",
  },
  appointment: {
    color: "#00acc1",
  },
  frontdesk: {
    color: "#00bfa5",
  },
  callagain: {
    color: "#9575cd",
  },
  confirmedappointment: {
    color: "#00897b",
  },
  followup: {
    color: "#fbc02d",
  },
  missedappointment: {
    color: "#7986cb",
  },
  rejected: {
    color: "#ff8a65",
  },
  visit_tracking: {
    color: "#e91e63",
  },
  visited: {
    color: "#880e4f",
  },
  wrongnumber: {
    color: "#757575",
  },
  application: {
    color: "#00897b",
  },
  approved_application: {
    color: "#43a047",
  },
  conditioned_application: {
    color: "#fbc02d",
  },
  rejected_application: {
    color: "#e53935",
  },
  separated: {
    color: "#00acc1",
  },
  new: {
    color: "#43a047",
  },
};

export const setSubstatusColor = (value) => {
  if (colors[value]) {
    return colors[value].color;
  } else {
    return "#5764b8";
  }
};
