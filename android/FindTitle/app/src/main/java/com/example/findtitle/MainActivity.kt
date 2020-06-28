package com.example.findtitle

import android.app.Activity
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.MediaStore
import com.android.volley.toolbox.JsonObjectRequest
import java.io.*
import org.json.JSONObject
import com.android.volley.Request
import com.android.volley.Response
import android.util.Base64
import android.util.JsonReader
import android.widget.*
import androidx.navigation.Navigation
import androidx.navigation.findNavController
import com.android.volley.VolleyError
import com.android.volley.RetryPolicy


class MainActivity : AppCompatActivity() {


    private val PICK_IMAGE_REQUEST = 71
    private var filePath: Uri? = null

    private lateinit var titleListView: ListView
    private lateinit var btnChooseImage: Button
    private lateinit var btnUploadImage: Button
    private lateinit var imagePreview: ImageView
    private lateinit var textView: TextView
    private lateinit var titleListAdapter: TitleListAdapter
    private lateinit var bitmap: Bitmap

    private var titleList: ArrayList<Doc?> = ArrayList()

    private var url = "https://trace.moe/api/search"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.fragment_main)

        btnChooseImage = findViewById(R.id.btn_choose_image)
        btnUploadImage = findViewById(R.id.btn_upload_image)
        imagePreview = findViewById(R.id.image_preview)
        textView = findViewById(R.id.textView)
        titleListView = findViewById(R.id.foundList)

        btnChooseImage.setOnClickListener { launchGallery() }
        btnUploadImage.setOnClickListener { gotoList() }

    }

    private fun launchGallery() {
        val intent = Intent()
        intent.type = "image/*"
        intent.action = Intent.ACTION_GET_CONTENT
        startActivityForResult(Intent.createChooser(intent, "Select Picture"), PICK_IMAGE_REQUEST)
    }

    private fun getPostData(): JSONObject {
        val baos = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos)
        val byteArrayImage = baos.toByteArray()
        val encodedImage = Base64.encodeToString(byteArrayImage, Base64.DEFAULT)

        val json = JSONObject()
        json.put("image", encodedImage)
        return json
    }

    private fun gotoList() {
        Navigation.findNavController(findViewById(R.id.fragment_title_list)).navigate(R.id.action_mainFragment_to_titleListFragment2)
    }

    private fun parse(json: String) {
        JsonReader(StringReader(json)).use { reader ->
            reader.beginArray()
            while (reader.hasNext()) {
                var anime = ""
                var title = ""
                var episode = ""
                reader.beginObject()
                while (reader.hasNext()) {
                    when (reader.nextName()) {
                        "anime" -> anime = reader.nextString()
                        "title" -> title = reader.nextString()
                        "episode" -> episode = reader.nextString()
                        else -> reader.skipValue()
                    }
                }
                reader.endObject()
                var newDoc = Doc(anime, title, episode)
                titleList.add(newDoc)
                titleListAdapter.add(newDoc)
            }
            reader.endArray()

        }
    }

    private fun uploadImage() {
        if (filePath != null) run {
            val postData: JSONObject = getPostData()

            val request = JsonObjectRequest(Request.Method.POST, url, postData,
                Response.Listener { response ->
                    try {
                        val docs = response.get("docs").toString()
                        titleListAdapter = TitleListAdapter(this, titleList)
                        titleListView.adapter = titleListAdapter
                        parse(docs)
                    } catch (e: Exception) {
                        textView.text = "Exception: $e"
                    }

                }, Response.ErrorListener {
                    // Error in request
                    val text = "Volley error: $it"
                    Toast.makeText(applicationContext, text, Toast.LENGTH_LONG).show()
                })

            request.retryPolicy = object : RetryPolicy {
                override fun getCurrentTimeout(): Int {
                    return 10000
                }

                override fun getCurrentRetryCount(): Int {
                    return 10000
                }

                @Throws(VolleyError::class)
                override fun retry(error: VolleyError) {

                }
            }

            VolleySingleton.getInstance(this).addToRequestQueue(request)

        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == Activity.RESULT_OK) {
            if (data == null || data.data == null) {
                return
            }

            filePath = data.data
            try {
                bitmap = MediaStore.Images.Media.getBitmap(contentResolver, filePath)
                imagePreview.setImageBitmap(bitmap)
            } catch (e: IOException) {
                e.printStackTrace()
            }
        }
    }
}
