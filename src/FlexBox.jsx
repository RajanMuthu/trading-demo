import './styles.scss';

const Provider = ({ providerName }) => {
    return (
        <div className='outline w-60 w-40-ns flex justify-center items-center  bg-red h4'>
            {providerName}
        </div>
    );
}

const Slot = ({ children }) => {
    return (
        <div className='outline flex justify-center w-100 w-10-ns'>
            {children}
        </div>
    );
}

const Appointment = ({index}) => {
    return (
        <div className="flex flex-wrap flex-nowrap-ns justify-around items-center content-between bg-yellow pa2">
            <Provider providerName={`Provider ${index}`} />
            <div className='outline w-60 w-40-ns justify-around items-center flex flex-column flex-row-ns bg-red h4'>
                {[1,2,3,4,5].map((index => {
                    return (
                    <Slot>{`Slot ${index}`}</Slot>
                    )
                }))}
            </div>
        </div>
    );
}

const FlexBox = () => {
    return (
        <>
            <div className='flex'>
                <div className='mr-auto pa2'>
                    Header
                </div>
                <div className='ml-auto pa2'>
                    Date Picker
                </div>
            </div>
            <div className='flex justify-center'>
                <div>
                    Date Carousal
                </div>
            </div>
            <div>
                {[1, 2, 3].map(index => {
                    return <Appointment index={index}/>
                })}
            </div>
        </>
    )
}

export default FlexBox;