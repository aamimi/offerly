const LeftAside = () => {
  return (
      <aside className="base-card w-72 pt-4 h-fit hidden lg:block">
          <div className="text-center mb-3 px-4"><span>Advertisements</span></div>
          <div className="flex flex-col gap-2" style={{ height: '75vh' }}>
              <div id="advertisement-g-first" className="h-full">
                  <img
                      src="https://picsum.photos/1920/1080?random=9"
                      alt="Advertisement"
                      className="h-full w-full object-cover"
                  />
              </div>
          </div>
      </aside>
  );
}

export default LeftAside;