package com.example.findtitle
import android.app.Activity
import android.view.View
import android.view.ViewGroup
import android.widget.*

class TitleListAdapter(private val context: Activity, private val list: ArrayList<Doc?>)
    : ArrayAdapter<Doc?>(context, R.layout.title_list) {

    override fun getView(position: Int, view: View?, parent: ViewGroup): View {
        val inflater = context.layoutInflater
        val rowView = inflater.inflate(R.layout.title_list, parent, false)

        val animeText = rowView.findViewById(R.id.anime) as TextView
        val titleText = rowView.findViewById(R.id.title) as TextView
        val subtitleText = rowView.findViewById(R.id.description) as TextView

        animeText.text = list[position]?.anime ?: ""
        titleText.text = list[position]?.title ?: ""
        subtitleText.text = list[position]?.episode ?: ""

        return rowView
    }
}