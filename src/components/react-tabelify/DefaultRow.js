import React from 'react';

class DefaultRow extends React.Component{

    getDefaultProps(){
        return({
            data: {},
            columnMetadata: [],
            className:'',
            onExpand:()=>{},
            onRowClick:()=>{}
        })
    }

    handleOnClick(event){
        this.props.onRowClick(this.props.data, event);
        event.isExpanded=!this.state.expand;
        this.setState({ expand:!this.state.expand});
        this.props.onExpand(this.props.data,event);
    }
    render(){

        return (
            <div className={"defaultRow "+this.props.className} onClick = {this.handleOnClick}>
                {/*<span className="expand-arrow">{this.props.renderRowExpand && expandIcon}</span>*/}
                <div className = {'defaultRow '+this.props.className} >
                {
                    this.props.columnMetadata.map((columnMeta, columnIndex) => {
                        var style = (columnMeta.flexBasis !== undefined) ? {flexBasis: columnMeta.flexBasis,flexGrow:0,flexShrink:0} : {};
                        if (columnMeta.flexGrow !== undefined) {
                            style.flexGrow = columnMeta.flexGrow;
                        }
                        if (columnMeta.flexShrink !== undefined) {
                            style.flexShrink = columnMeta.flexShrink;
                        }
                        if (typeof columnMeta.render === 'function') {
                            cell = columnMeta.render(this.props, this.state, columnMeta, columnIndex);
                        } else {
                            var cell = this.props.data[columnMeta.columnName];
                        }

                        if (typeof columnMeta.formatter === 'function') {
                            var cellToolTip = columnMeta.formatter(this.props.data[columnMeta.columnName]);
                        }else if(typeof this.props.data[columnMeta.columnName] === 'string' || typeof this.props.data[columnMeta.columnName]==='number'){
                            cellToolTip = this.props.data[columnMeta.columnName];
                        }else{
                            cellToolTip = columnMeta.displayName;
                        }

                        style = Object.assign(style,columnMeta.style);
                        return (
                            <div className={'defaultCell cell column-'+columnIndex+' column-'+columnMeta.columnName+" "+columnMeta.className} style={style} key={columnIndex} title={cellToolTip}>{cell}</div>
                        );
                    })
                }
                </div>
            </div>
        )
    }
}
export default DefaultRow
