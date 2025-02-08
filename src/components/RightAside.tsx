const RightAside = () => {
  return (
      <aside className="base-card w-80 pt-4 h-fit hidden lg:block">
          <div className="text-center mb-3 px-4"><span>Advertisements</span></div>
          <div className="flex flex-col gap-2 h-60">
              <div id="advertisement-g-first" className="h-full">
                  <img
                      src="https://picsum.photos/1920/1080?random=1"
                      alt="Advertisement"
                      className="h-full w-full object-cover"
                  />
              </div>
          </div>
      </aside>
  );
}

export default RightAside;