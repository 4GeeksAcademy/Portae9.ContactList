export const ContactEdit = () => {

    return (
        <>
            {/* Edit contact form */}
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center pt-5 col-12 col-sm-6 col-md-6 col-lg-8">
                <h1 className="pb-2" style={{color: "yellow"}}>Edit Contact:</h1>
                <form>
                    {/* full name input */}
                    <div className="input-group mb-3">
                        <span className="input-group-text">Full name:</span>
                        <input type="text" aria-label="First name" className="form-control" />
                    </div>
                    {/* email input */}
                    <div className="input-group mb-3">
                        <span className="input-group-text">Email:</span>
                        <input type="email" aria-label="Email address" className="form-control" />
                    </div>
                    {/* phone input */}
                    <div className="input-group mb-3">
                        <span className="input-group-text">Phone:</span>
                        <input type="tel" aria-label="Phone number" className="form-control" />
                    </div>
                    {/* address input */}
                    <div className="input-group mb-3">
                        <span className="input-group-text">Address:</span>
                        <input type="text" aria-label="Street address" className="form-control" />
                    </div>
                    {/* submit button */}
                    <button className="btn btn-outline-primary">Save</button>
                </form>
            </div>
        </>

    )
}