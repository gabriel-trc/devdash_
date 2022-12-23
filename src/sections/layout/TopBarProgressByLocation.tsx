import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

const TopBarProgressByLocation = () => {
	const [progress, setProgress] = useState(false);
	const [previousLocation, setPreviousLocation] = useState("");
	const location = useLocation();

	useEffect(() => {
		setPreviousLocation(location.pathname);
		setProgress(true);
		const hasClickedOnALinkToTheCurrentPage = location.pathname === previousLocation;
		if (hasClickedOnALinkToTheCurrentPage) {
			setPreviousLocation("");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	useEffect(() => {
		function disableTopBar() {
			setProgress(false);
		}
		document.addEventListener("pageLoaded", disableTopBar);

		return () => {
			document.removeEventListener("pageLoaded", disableTopBar);
		};
	}, [previousLocation]);

	if (!progress) {
		return <></>;
	}

	return <TopBarProgress />;
};

export default TopBarProgressByLocation;
