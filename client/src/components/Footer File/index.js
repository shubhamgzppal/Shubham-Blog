import React from "react";
import About from "./About";
import AllBlog from "./AllBlog";
import ContactUs from "./ContactUs";
import Contribute from "./Contribute";
import JoinCommunity from "./JoinCommunity";
import Privacy_Term from "./Privacy_Term";
import ReportAnIssue from "./ReportAnIssue";
import NewsLetter from "./NewsLetter";

// Mapping of internal footer routes (as used in footer_data) to components.
// Keys should match the href values in `assets.footer_data` (without leading slash).
const footerPanels = {
	'about': About,
	'latest-articles': AllBlog,
	'categories': AllBlog,
	'home': null, // home is the main site page; leave null
	'newsletter': NewsLetter,
	'contact': ContactUs,
	'report-issue': ReportAnIssue,
	'donate': Contribute,
	'privacy-terms': Privacy_Term,
	'community': JoinCommunity,
}

export default footerPanels;